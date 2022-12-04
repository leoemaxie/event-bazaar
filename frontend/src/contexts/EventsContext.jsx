import React, { useEffect, useState } from "react";
import EventBazaarABI from "../../artifacts/contracts/EventsBazaar.sol/EventsBazaar.json";
import EventNFTABI from "../../artifacts/contracts/EventNFT.sol/EventNFT.json";
import { ethers } from "ethers";
import { createEventBazaarContract, createEventNFTContract } from "./utils";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";

const { ethereum } = window;
const EventBazaarContract = "0x7D0A3eAef568AD115E209c52bb10b2DFa8f20e2B";
const EventNFTContract = "0x5F2E677C8bdDd62cC57761172091832348A32080";
const eventsBazaarabi = EventBazaarABI.abi;
const eventNFTabi = EventNFTABI.abi;
const auth =
  "Basic " +
  Buffer.from(
    `${import.meta.env.VITE_PROJECT_ID}` +
      ":" +
      `${import.meta.env.VITE_PROJECT_SECRET}`
  ).toString("base64");
const provider = new ethers.providers.Web3Provider(window.ethereum);

const IPFS = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export const EventsContext = React.createContext(null);

const EventsProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [allEvents, setAllEvents] = useState([]);

  //Connect wallet
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        if (!ethereum) return alert("Please install MetaMask.");
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts?.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          console.log("No accounts found");
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkIfWalletIsConnected();
  }, []);

  //Get all the Events Registered for sell of Tickets
  const getAllEvents = async () => {
      const bazaarContract = createEventBazaarContract(
        EventBazaarContract,
        provider,
        eventsBazaarabi
      );
      const eventContract = createEventNFTContract(
        EventNFTContract,
        provider,
        eventNFTabi
      );
      const eventsCount = await bazaarContract.eventCount();
      let events = [];
      if (eventsCount == 0) return;
      for (let i = 1; i <= eventsCount; i++) {
        let event = await bazaarContract.events(i);
        let formatedData = {
          tokenId: ethers.utils.formatUnits(event.tokenId, 'wei'),
          volume: ethers.utils.formatUnits(event.volume, 'wei'),
          price: ethers.utils.formatEther(event.price),
          soldOut: event.soldOut
        };
        let ticketUri = await eventContract.ticketUri(event.tokenId);
        let result = await fetch(
          `https://events-bazaar.infura-ipfs.io/ipfs/${ticketUri}`
        );
        let data = await result.json();
  
        events.push({ ...formatedData, metadata: data });
      }
      setAllEvents(events);
      return events; 
  };

  //Get relisted Tickets of an event
  const getRelistedTicketsOfEvent = async (eventId) => {
    const bazaarContract = createEventBazaarContract(
      EventBazaarContract,
      provider,
      eventsBazaarabi
    );
    const relistedTicketCount = await bazaarContract.relistedTicketCount();
    if (relistedTicketCount == 0) return;

    let relistedTickets = [];

    for (let i = 1; i <= relistedTicketCount; i++) {
      let ticket = await bazaarContract.relistedTickets(i);
      if (ticket.eventId == eventId) {
        relistedTickets.push(ticket);
      }
    }

    return relistedTickets;
  };

  //Get my purchased tickets
  const getMyPurchasedTickets = async (addr) => {
    const bazaarContract = createEventBazaarContract(
      EventBazaarContract,
      provider,
      eventsBazaarabi
    );
    const eventContract = createEventNFTContract(
      EventNFTContract,
      provider,
      eventNFTabi
    );

    const eventsCount = await bazaarContract.eventCount();
    let events = [];
    if (eventsCount == 0) return;

    for (let i = 1; i <= eventsCount; i++) {
      const bal = await bazaarContract.getBalanceOfAddress(addr, i);
      const formatedBalance = ethers.utils.formatUnits(bal, 'wei');

      if (formatedBalance > 0) {
        let ticketUri = await eventContract.ticketUri(i);
        let result = await fetch(
          `https://events-bazaar.infura-ipfs.io/ipfs/${ticketUri}`
        );
        let data = await result.json();

        events.push({ ...data, eventId: i });
      }
    }
    return events;
  };

  //Register a new event
  const registerEvent = async (eventDetails) => {
    const bazaarContract = createEventBazaarContract(
      EventBazaarContract,
      provider,
      eventsBazaarabi
    );
    const eventContract = createEventNFTContract(
      EventNFTContract,
      provider,
      eventNFTabi
    );

    console.log("registerEvent");
    //Upload a json file with the events details
    //Mint the tickets
    //Approve bazaar to spend all our tickets
    //Call the registerEvent on bazaar function
    try {
      const res = await IPFS.add(eventDetails.image);
      const imageUrl = `https://events-bazaar.infura-ipfs.io/ipfs/${res.path}`;

      let eventData = { ...eventDetails, image: imageUrl };

      const cid = await IPFS.add(JSON.stringify(eventData));

      const receipt = await eventContract.mintTickets(
        eventDetails.volume,
        cid.path
      );
      console.log("receipt", await receipt.wait());
      console.log(
        "receipt.getTransactionReceipt()",
        await receipt.getTransactionReceipt()
      );

      const id = await eventContract.TICKET();
      const approveReceipt = await eventContract.setApprovalForAll(
        EventBazaarContract,
        id
      );
      await approveReceipt.wait();

      const listingPrice = ethers.utils.parseEther(
        eventDetails.price.toString()
      );
      const registerReceipt = await bazaarContract.registerEvent(
        EventNFTContract,
        listingPrice,
        id
      );
      await registerReceipt.wait();
    } catch (error) {
      console.log(error);
    }
  };

  //Pirchase Ticket
  const buyTicket = async (eventId) => {
    const bazaarContract = createEventBazaarContract(
      EventBazaarContract,
      provider,
      eventsBazaarabi
    );

    const totalPrice = await bazaarContract.getTotalPrice(eventId);
    const tx = await bazaarContract.purchaseTicket(eventId, { value: totalPrice });
    await tx.wait()
  };

  //Buy Relisted Ticket of an event
  const buyRelistedTicket = async (id) => {
    const bazaarContract = createEventBazaarContract(
      EventBazaarContract,
      provider,
      eventsBazaarabi
    );

    const totalPrice = await bazaarContract.getTotalPrice(id);
    const tx = await bazaarContract.purchaseRelistedTicket(id, {
      value: totalPrice,
    });
    await tx.wait();
  };

  const giftMyTicket = async (addr, eventId) => {
    const bazaarContract = createEventBazaarContract(
      EventBazaarContract,
      provider,
      eventsBazaarabi
    );
    const eventContract = createEventNFTContract(
      EventNFTContract,
      provider,
      eventNFTabi
    );

    await (await eventContract.setApprovalForAll(EventBazaarContract, true)).wait();
    await (await bazaarContract.giftMyTicket(addr, eventId)).wait();
  };

  const relistMyTicket = async (eventId) => {
    const bazaarContract = createEventBazaarContract(
      EventBazaarContract,
      provider,
      eventsBazaarabi
    );
    const eventContract = createEventNFTContract(
      EventNFTContract,
      provider,
      eventNFTabi
    );

    await (await eventContract.setApprovalForAll(EventBazaarContract, true)).wait();
    await ( await bazaarContract.listMyPurchasedTicket(eventId)).wait();
  };

  return (
    <EventsContext.Provider
      value={{
        walletAddress,
        connectWallet,
        allEvents,
        registerEvent,
        relistMyTicket,
        getAllEvents,
        buyRelistedTicket,
        giftMyTicket,
        getRelistedTicketsOfEvent,
        buyTicket,
        getMyPurchasedTickets
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export default EventsProvider;
