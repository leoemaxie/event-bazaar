import { Link } from "react-router-dom";
import ticketLogo from "../assets/images/EventBazaar.png";
import person from "../assets/images/person.png";
import { useContext } from "react";
import { NavContext } from "../contexts/NavContext";
import { EventsContext } from "../contexts/EventsContext";
import { shortenAddress } from "../utils/utils";

const Navbar = () => {
  const { activeMenu, handleActive } = useContext(NavContext);
  const { connectWallet, walletAddress } = useContext(EventsContext);

  return (
    <nav className="bg-darkPurple px-8 md:px-12 lg:px-20 2xl:px-0">
      <div className="flex justify-between items-center max-w-8xl m-auto h-20">
        <Link to="/">
          <img
            src={ticketLogo}
            alt="Event Bazaar"
            className="w-4/5 md:w-full"
          />
        </Link>
        {walletAddress && (
          <ul className="hidden text-white lg:flex text-lg">
            <li
              className={`${
                activeMenu === "event" &&
                "rounded-3xl bg-white text-blue font-semibold"
              } px-4 mx-4 cursor-pointer`}
              onClick={() => handleActive("event")}
            >
              <Link to="/events">Explore Events</Link>
            </li>
            <li
              className={`${
                activeMenu === "works" &&
                "rounded-3xl bg-white text-blue font-semibold"
              } px-4 mx-4 cursor-pointer`}
              onClick={() => handleActive("works")}
            >
              <Link to="/createEvent">Create Event</Link>
            </li>
          </ul>
        )}

        <div className="flex items-center">
          <button
            className="hidden md:block text-blue rounded-3xl border-blue border-[1px] px-5 py-2 mr-4"
            onClick={connectWallet}
            disabled={walletAddress ? true : false}
          >
            {walletAddress
              ? `${shortenAddress(walletAddress)}`
              : "Connect Wallet"}
          </button>
          {walletAddress && (
            <Link to="/userProfile">
              <div className="w-11 h-11 bg-blue rounded-full flex justify-center items-center cursor-pointer">
                <img src={person} alt="person icon" />
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
