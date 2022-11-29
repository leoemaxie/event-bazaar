import { createContext, useState } from "react";
import upcomingEvents from '../../event'

export const EventContext = createContext()

const EventContextProvider = ({ children }) => {
    const [category, setCategory] = useState('all')
    const [events, setEvents] = useState(upcomingEvents)

    const filterByCategory = (eventCat) => {
        setCategory(eventCat)
        console.log(category)
        if (category === 'all') {
            setEvents(upcomingEvents)
        }
        else {
            const updateByCategory = events.filter(cat => {
                cat.category === category
            })
            console.log(updateByCategory)
            setEvents(updateByCategory)
        }
    }

    return (
        <EventContext.Provider value={{ events, category, filterByCategory }}>
            {children}
        </EventContext.Provider>
    )
}

export default EventContextProvider