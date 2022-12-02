import EventHeader from '../components/EventHeader'
import EventTable from '../components/EventTable'
import nftTicketImg from '../assets/images/nftTicketImg.png'
import { useContext, useEffect } from "react"
import { EventContext } from "../contexts/EventContext"
import { FormContext } from "../contexts/FormContext"

const UserProfile = () => {
    const { events, filteringEvent } = useContext(EventContext)
    const { openGiftTicket } = useContext(FormContext)


    useEffect(() => {
        if (openGiftTicket) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'visible';
    }, [openGiftTicket]);

    return (
        <div className='bg-white'>
            <div className='p-6 px-2 md:p-8 w-11/12 mx-auto max-w-8xl'>
                <div className='flex mb-8'>
                    <div className='flex p-6 bg-whiteShade items-center'>
                        <img
                            src={nftTicketImg}
                            alt="user profile image"
                            className='mr-4 w-[50px] h-[50px] md:w-[70px] md:h-[70px] rounded-full object-cover'
                        />
                        <div className='font-semibold -ml-2 md:ml-0'>
                            <p className='text-lg -mb-2'>Tom Jerry</p>
                            <span className='text-xs'>Xo...</span>
                        </div>
                    </div>
                    <div className='flex p-6 items-center bg-gradient-to-r from-blueShade to-blue flex-col text-white'>
                        <span>Wallet Balance</span>
                        <span className='text-3xl font-bold'>9.04 ETH</span>
                    </div>
                </div>
                <div className='lg:flex'>
                    <div className='flex-1 mr-8'>
                        <EventHeader title='Events' showSearch='true' />
                        <EventTable filteringEvent={filteringEvent} />
                    </div>
                    <div className='bg-whiteShade py-8 px-4 rounded-2xl flex-0 h-fit'>
                        <p className='font-semibold text-2xl ml-2'>Upcoming Events</p>
                        <div className='mt-8'>
                            {events.map(event => (
                                <div className='rounded-lg flex items-center justify-between md:justify-evenly hover:bg-white cursor-pointer p-2' key={event.id}>
                                    <img
                                        src={nftTicketImg}
                                        alt="Event Ticket image"
                                        className='mr-4 w-[50px] h-[50px] rounded-full object-cover'
                                    />
                                    <div className='flex flex-col mr-4'>
                                        <span className='font-semibold text-sm'>{event.title.length > 15 ? event.title.slice(0, 15) + ' ...' : event.title}</span>
                                        <span className='text-xs'>{event.hostName}</span>
                                    </div>
                                    <div className='px-4 py-1 rounded bg-whiteShade text-blueShade'>{event.date} {event.month}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile