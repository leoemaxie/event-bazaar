import { createContext, useState, useMemo, useContext } from "react";
import { upcomingEvents } from '../../event'
import { EventsContext } from "./EventsContext";

export const EventContext = createContext()

const EventContextProvider = ({ children }) => {
    const { getAllEvents } = useContext(EventsContext);

    const [eventCategory, setEventCategory] = useState('all')
    const [events, setEvents] = useState([])
    const [getEventInfo, setGetEventInfo] = useState({})
    const [search, setSearch] = useState('')
    const [mode, setMode] = useState('')

    // function to implement search
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    // filtering based on searched event
    const filteringEvent = events.filter(event => event.title.toLowerCase().includes(search.toLowerCase()))

    function handleCategoryChange(e) {
        // setSelectedCategory(e.target.value);
        setMode(e.target.value);
    }

    // Function to get filtered list
    function getFilteredList() {
        // Avoid filter when selectedCategory is null
        if (!mode) {
            return events;
        }
        return events.filter((item) => item.mode === mode);
    }

    // Avoid duplicate function calls with useMemo
    let filteredList = useMemo(getFilteredList, [mode, events]);

    // function get the id of event clicked to display it data
    const handleClick = (id) => {
        const getEventdetails = getAllCategory().find(detail => detail.id === id);
        setGetEventInfo(getEventdetails)
    }

    // function to show all data
    const getAllCategory = async () => {
        const allCategory = await getAllEvents()
        return allCategory;
    }

    const filterByCategory = (category) => {
        let filtredPokemon = getAllCategory().filter(cate => cate.category === category);
        return filtredPokemon;
    }

    function handleCategory(e) {
        let eventCat = e.target.value;
        setEventCategory(eventCat)

        eventCat !== "all"
            ? setEvents(filterByCategory(eventCat))
            : setEvents(getAllCategory());
    }
    return (
        <EventContext.Provider value={{
            getEventInfo,
            setGetEventInfo,
            handleClick,
            events,
            eventCategory, setEvents,
            getAllCategory,
            handleCategory,
            filterByCategory,
            search,
            handleSearch,
            filteringEvent,
            filteredList,
            handleCategoryChange
        }}>
            {children}
        </EventContext.Provider>
    )
}

export default EventContextProvider