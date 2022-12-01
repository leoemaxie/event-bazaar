import { createContext, useState } from "react";
import { upcomingEvents } from '../../event'

export const EventContext = createContext()

const EventContextProvider = ({ children }) => {

    const [eventCategory, setEventCategory] = useState('all')
    const [events, setEvents] = useState(upcomingEvents)

    const [getEventInfo, setGetEventInfo] = useState({})

    const handleClick = (id) => {
        const getEventdetails = getAllCategory().find(detail => detail.id === id);
        setGetEventInfo(getEventdetails)
    }

    const getAllCategory = () => {
        const allCategory = upcomingEvents
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
        <EventContext.Provider value={{ getEventInfo, setGetEventInfo, handleClick, events, eventCategory, setEvents, getAllCategory, handleCategory, filterByCategory }}>
            {children}
        </EventContext.Provider>
    )
}

export default EventContextProvider