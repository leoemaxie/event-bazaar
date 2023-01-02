import React, { useEffect, useState } from "react";
import EventBazaarABI from "../../artifacts/contracts/EventsBazaar.sol/EventsBazaar.json";
import { ethers } from "ethers";
import { createEventBazaarContract } from "./utils";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";

const { ethereum } = window;
const EventBazaarContract = "0x17c1518c924c2dfEecBC74eABDE1499428D96442";
const eventsBazaarabi = EventBazaarABI.abi;
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
  const [events, setEvents] = useState([]);
  const [getEventInfo, setGetEventInfo] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      const allEvents = await getAllEvents();
      setEvents(allEvents);
    };
    fetchEvents();
  }, [walletAddress]);

  // function to implement search
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  // filtering based on searched event
  const filteringEvent = events?.filter((event) =>
    event.metadata.title.toLowerCase().includes(search.toLowerCase())
  );

  function handleCategoryChange(e) {
    // setSelectedCategory(e.target.value);
    setMode(e.target.value);
  }

  // function get the id of event clicked to display it data
  const handleClick = (id) => {
    const getEventdetails = events.find((detail) => detail.tokenId == id);
    setGetEventInfo(getEventdetails);
  };

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
    const eventsCount = await bazaarContract.eventCount();
    let events = [];
    if (eventsCount == 0) return;
    for (let i = 1; i <= eventsCount; i++) {
      let event = await bazaarContract.events(i);
      let formatedData = {
        tokenId: ethers.utils.formatUnits(event.tokenId, "wei"),
        volume: ethers.utils.formatUnits(event.volume, "wei"),
        price: ethers.utils.formatEther(event.price),
        soldOut: event.soldOut,
      };
      let ticketUri = await bazaarContract.ticketUri(event.tokenId);
      let result = await fetch(
        `https://events-bazaar.infura-ipfs.io/ipfs/${ticketUri}`
      );
      let data = await result.json();
      let img = { imgurl: '' };

      try {
        img = await (await fetch(`${data.image}`)).json()
      } catch (error) {
        img = { imgurl: '' };
      }
      events.push({ ...formatedData, metadata: { ...data, image: img.imgurl } });
    }
    setAllEvents(events);
    console.log(events)
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

    const eventsCount = await bazaarContract.eventCount();
    let events = [];
    if (eventsCount == 0) return;

    for (let i = 1; i <= eventsCount; i++) {
      const bal = await bazaarContract.getBalanceOfAddress(addr, i);
      const formatedBalance = ethers.utils.formatUnits(bal, "wei");

      if (formatedBalance > 0) {
        let ticketUri = await bazaarContract.ticketUri(i);
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

    //Upload a json file with the events details
    //Mint the tickets
    //Approve bazaar to spend all our tickets
    //Call the registerEvent on bazaar function
    try {
      const res = await IPFS.add(JSON.stringify({ imgurl: eventDetails.image }));
      const imageUrl = `https://events-bazaar.infura-ipfs.io/ipfs/${res.path}`;

      let eventData = { ...eventDetails, image: imageUrl };

      const cid = await IPFS.add(JSON.stringify(eventData));

      const listingPrice = ethers.utils.parseEther(
        eventDetails.price.toString()
      );
      const registerReceipt = await bazaarContract.registerEvent(
        listingPrice,
        cid.path,
        eventDetails.volume
      );
      await registerReceipt.wait();
      await getAllEvents();
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
    const tx = await bazaarContract.purchaseTicket(eventId, {
      value: totalPrice,
    });
    await tx.wait();
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

    await (
      await bazaarContract.setApprovalForAll(EventBazaarContract, true)
    ).wait();
    await (await bazaarContract.giftMyTicket(addr, eventId)).wait();
    getMyPurchasedTickets(walletAddress)
  };

  const relistMyTicket = async (eventId) => {
    const bazaarContract = createEventBazaarContract(
      EventBazaarContract,
      provider,
      eventsBazaarabi
    );

    await (
      await bazaarContract.setApprovalForAll(EventBazaarContract, true)
    ).wait();
    await (await bazaarContract.listMyPurchasedTicket(eventId)).wait();
    getMyPurchasedTickets(walletAddress)
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
        getMyPurchasedTickets,
        getEventInfo,
        setGetEventInfo,
        handleClick,
        events,
        setEvents,
        search,
        handleSearch,
        filteringEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export default EventsProvider;
