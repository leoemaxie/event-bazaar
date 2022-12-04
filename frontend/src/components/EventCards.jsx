import { Link } from "react-router-dom";
import { EventContext } from "../contexts/EventContext";
import { EventsContext } from "../contexts/EventsContext";
import { useContext } from "react";
import ether from "../assets/images/ethereum.png";
import Jazzicon from "react-jazzicon";
import Attendants from "./Attendants";

//const categories = ['All', 'Free', 'Sports', 'Cartoon', 'Virtual World', 'Classic', '3D Abstract', 'Game']

const EventCards = ({ event }) => {
  const { handleClick } = useContext(EventContext);
  const { walletAddress } = useContext(EventsContext);

  return (
    <div className="eventCard">
      <div className="flex justify-between items-center">
        <div className="text-white">
          <p>Price</p>
          <div className="flex items-center font-semibold text-blue">
            <img src={ether} alt="Ethereum" />
            <span>{event.price} MATIC</span>
          </div>
        </div>
        {walletAddress && (
          <Link
            to={`/event-details/${event.tokenId}`}
            onClick={() => handleClick(event.tokenId)}
          >
            <button className="bg-blue py-2 px-4 rounded-3xl font-semibold">
              Attend
            </button>
          </Link>
        )}
      </div>
      {/* <div className='w-[344px] h-[156px] my-4 border-blue border-[1px]'> */}
      <img src={event.metadata.image} alt="Event card" className="my-4" />
      {/* </div> */}
      <div className="flex px-2 md:px-4 xl:px-6">
        <div className="mr-4">
          <span className="text-blue text-xs font-semibold">
            {event.metadata.month}
          </span>
          <span className="text-2xl block font-semibold">
            {event.metadata.date}
          </span>
        </div>
        <div>
          <p className="font-semibold mb-2">
            {event.metadata.title.length > 30
              ? event.metadata.title.slice(0, 40) + " ..."
              : event.metadata.title}
          </p>
          <span className="text-sm">
            {event.metadata.description.length > 30
              ? event.metadata.description.slice(0, 80) + " ..."
              : event.metadata.description}
          </span>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mt-4">
          <div>
            <div className="flex mt-2">
              <Jazzicon
                diameter={30}
                seed={Math.round(Math.random() * 10000000)}
              />
            </div>
          </div>
          <Attendants volume={event.volume} />
        </div>
      </div>
    </div>
  );
};

export default EventCards;
