import { createContext, useState, useMemo, useContext, useEffect } from "react";
import { EventsContext } from "./EventsContext";

export const EventContext = createContext();

const EventContextProvider = ({ children }) => {
  const { getAllEvents, walletAddress } = useContext(EventsContext);

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

  return (
    <EventContext.Provider
      value={{
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
    </EventContext.Provider>
  );
};

export default EventContextProvider;
