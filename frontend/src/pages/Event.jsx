import EventCards from '../components/EventCards'
import { upcomingEvents } from '../../event'
import EventHeader from '../components/EventHeader'
import ReachUs from '../components/ReachUs';
import SellTicket from "../components/SellTicket";
import { useContext, useState } from "react"
import { EventContext } from "../contexts/EventContext"


const Event = () => {
    const { filteringEvent } = useContext(EventContext)

    return (
        <>
            <div className='p-8 md:px-12 lg:px-20 2xl:px-0 max-w-8xl m-auto'>
                <EventHeader title='Events' showSearch='true' />
                <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-8'>
                    {filteringEvent.map(event => (
                        <EventCards event={event} key={event.id} />
                    ))}
                </div>
                <div className='flex justify-center mt-8'>
                    <button className='text-blue rounded-3xl border-blue border-[1px] px-8 py-3'>Load More</button>
                </div>
            </div>
            <SellTicket />
            <ReachUs />
        </>
    )
}

export default Event