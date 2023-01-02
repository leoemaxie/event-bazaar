import { useContext } from "react";
import calender from "../assets/images/calendar.png";
import location from "../assets/images/location.png";
import ether from "../assets/images/ethereum.png";
import Attendants from "../components/Attendants";
import SellTicket from "../components/SellTicket";
import ReachUs from "../components/ReachUs";
import { EventsContext } from "../contexts/EventsContext";
import { useEffect } from "react";
import { useState } from "react";

const EventDetails = () => {
  const { buyTicket, getRelistedTicketsOfEvent, buyRelistedTicket, getEventInfo } =
    useContext(EventsContext);
  const [relistedTickets, setTickets] = useState([]);

  useEffect(() => {
    (async function () {
      const tickets = await getRelistedTicketsOfEvent(getEventInfo.tokenId);
      setTickets(tickets);
    })();
  }, []);

  const purchaseTicket = () => {
    buyTicket(getEventInfo.tokenId);
  };

  const purchaseRelistedTicket = () => {
    buyRelistedTicket(getEventInfo.tokenId);
  };

  return (
    <>
      <div className="p-6 md:p-8 w-11/12 lg:w-3/4 m-auto max-w-6xl">
        <div className="flex font-semibold">
          <div className="flex flex-col mr-8 md:mr-12">
            <span className="text-sm">{getEventInfo.metadata.month}</span>
            <span className="text-3xl lg:text-4xl">
              {getEventInfo.metadata.date}
            </span>
          </div>
          <p className="text-2xl md:text-4xl">{getEventInfo.metadata.title}</p>
        </div>
        <div className="flex flex-col my-8">
          <div className="flex">
            <p className="text-textPurple font-semibold pb-2">
              {getEventInfo.metadata.title}
            </p>
          </div>
          <div className="flex flex-col md:flex-row mt-4">
            <div className="hidden rounded bg-gray mr-8 md:mr-12 w-[40px] h-[40px] md:flex justify-center items-center">
              <img src={calender} alt=" calender icon" className="w-3/4" />
            </div>
            <div className="flex flex-col md:w-1/3">
              <span className="font-semibold">
                {getEventInfo.metadata.time}
              </span>
              <span>{getEventInfo.metadata.timeZone.toUpperCase()}</span>
            </div>
            <div className="flex mt-4 md:mt-0">
              <div className=" hidden rounded bg-gray mr-2 w-[40px] h-[40px] md:flex justify-center items-center">
                <img src={location} alt="location icon" className="w-3/4" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">About</span>
                <span className="md:pr-20">{getEventInfo.metadata.title}</span>
              </div>
            </div>
          </div>
        </div>
        <img src={getEventInfo.metadata.image} alt="Ticket NFt" />
        <p className="my-8">{getEventInfo.metadata.description}</p>
        <div className="flex justify-between">
          <div className="flex flex-col p-4">
            <div className="flex items-center mb-4">
              <span className="mr-2">Price</span>
              <img src={ether} alt="Ethereum wallet" />
              <span>{getEventInfo.metadata.price} MATIC</span>
            </div>
            <button
              className="bg-blue text-white py-2 px-4 rounded-3xl font-semibold flex"
              onClick={purchaseTicket}
              disabled={getEventInfo.soldOut}
            >
              {getEventInfo.soldOut ? "Tickets Sold Out" : "Buy Ticket"}
            </button>
          </div>
          <div className="hidden md:block">
            <Attendants volume={getEventInfo.metadata.volume} />
          </div>
        </div>
        {relistedTickets?.length > 0 && (
          <div className="p-4">
            <span>Buy Relisted Tickets</span>
            <p>{`${relistedTickets?.length}`} Tickets Available</p>
            <button
              className="bg-blue text-white py-2 px-4 rounded-3xl font-semibold flex"
              onClick={purchaseRelistedTicket}
            >
              Buy Relisted Ticket
            </button>
          </div>
        )}
      </div>
      <SellTicket />
      <ReachUs />
    </>
  );
};

export default EventDetails;
