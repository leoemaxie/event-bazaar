import { useEffect } from 'react'
import EventCards from './EventCards'
import EventHeader from './EventHeader'
import { useContext } from "react"
import { EventContext } from "../contexts/EventContext"
import { EventsContext } from '../contexts/EventsContext'

const UpcomingEvents = () => {
    const { getAllEvents } = useContext(EventsContext);
    const { events } = useContext(EventContext);

    return (
        <div className='px-8 md:px-12 lg:px-20 py-8 2xl:px-0 bg-gradient-to-tl from-darkPurple to-white'>
            <div className='max-w-8xl m-auto'>
                <EventHeader title='Upcoming Events' showSearch='false' />
                <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-8'>
                    {events.map(event => (
                        <EventCards event={event} key={event.tokenId} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UpcomingEvents
