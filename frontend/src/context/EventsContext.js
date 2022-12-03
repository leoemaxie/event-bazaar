import React, { useEffect, useState } from 'react'
import EventBazaarABI from '../../artifacts/contracts/EventsBazaar.sol/EventsBazaar.json';
import EventNFTABI from '../../artifacts/contracts/EventNFT.sol/EventNFT.json';
import { ethers } from 'ethers';
import { createEventBazaarContract, createEventNFTContract } from './utils'
import { create } from "ipfs-http-client";
import { Buffer } from 'buffer'

const { ethereum } = window;
const EventBazaarContract = "0xeB9b66d860fdC4fD100a30DD287E85872844715a";
const EventNFTContract = "0x5063c428C1Fc562Abe0ff124bB6d6091b6692889";
const eventsBazaarabi = EventBazaarABI.abi;
const eventNFTabi = EventNFTABI.abi;
const auth =
  'Basic ' + Buffer.from(`${import.meta.env.VITE_PROJECT_ID}` + ':' + `${import.meta.env.VITE_PROJECT_SECRET}`).toString('base64');

const IPFS = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  }
})

const EventsContext = React.createContext();

export const useEventsContext = () => EventsContext;

export const EventsProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [allEvents, setAllEvents] = useState([]);

  //Connect wallet
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const accounts = await ethereum.request({ method: "eth_requestAccounts", });
      setWalletAddress(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      setProvider(provider);
    }
  }, [])

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        if (!ethereum) return alert("Please install MetaMask.");
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length) {
          setWalletAddress(accounts[0]);
        } else {
          console.log("No accounts found");
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkIfWalletIsConnected()
  }, [])

  //Get all the Events Registered for sell of Tickets
  const getAllEvents = async () => {
    const bazaarContract = await createEventBazaarContract(EventBazaarContract, provider, eventsBazaarabi);
    const eventContract = await createEventNFTContract(EventNFTContract, provider, eventNFTabi);
    const eventsCount = await bazaarContract.eventCount();
    let events = [];
    if (eventsCount == 0) return;
    for (let i = 1; i <= eventsCount; i++) {
      let event = await bazaarContract.events(i);
      let ticketUri = await eventContract.uri(event.tokenId);
      let result = await fetch(`${ticketUri}`);
      let data = await result.json();

      events.push({ ...event, metadata: data });
    }
    setAllEvents(events);
  }

  //Get relisted Tickets of an event
  const getRelistedTicketsOfEvent = async (eventId) => {
    const bazaarContract = await createEventBazaarContract(EventBazaarContract, provider, eventsBazaarabi);
    const relistedTicketCount = await bazaarContract.relistedTicketCount();
    if (relistedTicketCount == 0) return;

    let relistedTickets = [];

    for (let i = 1; i <= relistedTicketCount; i++) {
      let ticket = await bazaarContract.relistedTickets(i);
      if (ticket.eventId == eventId) {
        relistedTickets.push(ticket);
      };
    }

    return relistedTickets;
  }

  //Register a new event
  const registerEvent = async (eventDetails) => {
    const bazaarContract = await createEventBazaarContract(EventBazaarContract, provider, eventsBazaarabi);
    const eventContract = await createEventNFTContract(EventNFTContract, provider, eventNFTabi);

    //Upload a json file with the events details
    try {
      //Upload image to ipfs
      const cid = await IPFS.add(eventDetails.image);
      const imageUrl = `https://events-bazaar.infura-ipfs.io/ipfs/${cid.path}`;

      let data = { ... }

      const res = await IPFS.add(JSON.stringify(data));
      //const cid = await IPFS.add(JSON.stringify(data[i]))
      
    } catch (error) {
      
    }
  
    //Mint the tickets
    //Approve bazaar to spend all our tickets
    //Call the registerEvent on bazaar function
  }

  //Pirchase Ticket
  const buyTicket = async (eventId) => {
    const bazaarContract = await createEventBazaarContract(EventBazaarContract, provider, eventsBazaarabi);

    const totalPrice = await bazaarContract.getTotalPrice(eventId);
    await bazaarContract.purchaseTicket(eventId, { value: totalPrice }).wait();
  }

  //Buy Relisted Ticket of an event
  const buyRelistedTicket = async (id) => {
    const bazaarContract = await createEventBazaarContract(EventBazaarContract, provider, eventsBazaarabi);

    const totalPrice = await bazaarContract.getTotalPrice(id);
    const tx = await bazaarContract.purchaseRelistedTicket(id, { value: totalPrice });
    await tx.wait();
  }

  const giftMyTicket = async (addr, eventId) => {
    const bazaarContract = await createEventBazaarContract(EventBazaarContract, provider, eventsBazaarabi);
    const eventContract = await createEventNFTContract(EventNFTContract, provider, eventNFTabi);

    await eventContract.setApprovalForAll(EventBazaarContract, true).wait();
    await bazaarContract.giftMyTicket(addr, eventId).wait();
  }

  const relistMyTicket = async () => {
    const bazaarContract = await createEventBazaarContract(EventBazaarContract, provider, eventsBazaarabi);
    const eventContract = await createEventNFTContract(EventNFTContract, provider, eventNFTabi);

    await eventContract.setApprovalForAll(EventBazaarContract, true).wait();
    await bazaarContract.listMyPurchasedTicket(eventId).wait();
  }

  return (
    <EventsContext.Provider value={{ walletAddress, connectWallet, allEvents }}>
      {children}
    </EventsContext.Provider>
  )
}
