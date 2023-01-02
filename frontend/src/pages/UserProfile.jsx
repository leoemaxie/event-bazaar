import EventHeader from "../components/EventHeader";
import EventTable from "../components/EventTable";
import { useContext, useEffect } from "react";
import { FormContext } from "../contexts/FormContext";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { EventsContext } from "../contexts/EventsContext";
import { shortenAddress } from "../utils/utils";
import { useState } from "react";
import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(window.ethereum);

const UserProfile = () => {
  const { walletAddress, events, filteringEvent, getMyPurchasedTickets } = useContext(EventsContext);
  const { openGiftTicket } = useContext(FormContext);
  const [balance, setBalance] = useState(null);
  const [myTickets, setMyTickets] = useState([]);

  useEffect(() => {
    if (openGiftTicket) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "visible";
  }, [openGiftTicket]);

  useEffect(() => {
    (async function () {
      if (walletAddress) {
        let bal = await provider.getBalance(walletAddress);
        setBalance(ethers.utils.formatEther(bal));
      }
    })();
  }, []);

  useEffect(() => {
    (async function() {
      if (walletAddress) {
        const tickets = await getMyPurchasedTickets(walletAddress);
        setMyTickets(tickets);
      }
    })()
  },[])

  return (
    <div className="bg-white">
      <div className="p-6 px-2 md:p-8 w-11/12 mx-auto max-w-8xl">
        <div className="flex mb-8">
          <div className="flex p-6 bg-whiteShade items-center">
            <Jazzicon
              diameter={50}
              seed={jsNumberForAddress(`${walletAddress}`)}
            />
            <div className="font-semibold -ml-2 md:ml-0">
              <span className="ml-4 text-xs">
                {shortenAddress(`${walletAddress}`)}
              </span>
            </div>
          </div>
          <div className="flex p-6 items-center bg-gradient-to-r from-blueShade to-blue flex-col text-white">
            <span>Wallet Balance</span>
            {balance && (
              <span className="text-xl font-bold">{Number(balance).toFixed(4)} MATIC</span>
            )}
          </div>
        </div>
        <div className="lg:flex">
          <div className="flex-1 lg:mr-8">
            <EventHeader title="My Tickets" showSearch="true" />
            <EventTable tickets={myTickets} />
          </div>
          <div className="bg-whiteShade py-8 px-4 rounded-2xl flex-0 h-fit">
            <p className="font-semibold text-2xl ml-2">Upcoming Events</p>
            <div className="mt-8">
              {events.map((event) => (
                <div
                  key={event.tokenId}
                  className="rounded-lg flex items-center justify-between md:justify-evenly hover:bg-white cursor-pointer p-2"
                >
                  <img
                    src={event.metadata.image}
                    alt="Event"
                    className="mr-4 w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <div className="flex flex-col mr-4">
                    <span className="font-semibold text-sm">
                      {event.metadata.title.length > 15
                        ? event.title.slice(0, 15) + " ..."
                        : event.metadata.title}
                    </span>
                  </div>
                  <div className="px-4 py-1 rounded bg-whiteShade text-blueShade">
                    {event.metadata.date} {event.metadata.month}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
