import EventHeader from '../components/EventHeader'
import nftTicketImg from '../assets/images/nftTicketImg.png'
import { useContext } from "react"
import { EventContext } from "../contexts/EventContext"

const UserProfile = () => {
    const { events } = useContext(EventContext)
    return (
        <div className='bg-whiteShade'>
            <div className='p-6 md:p-8 w-11/12 mx-auto max-w-8xl'>
                <div className='flex mb-8'>
                    <div className='flex p-6 bg-white items-center'>
                        <img
                            src={nftTicketImg}
                            alt="user profile image"
                            className='mr-4 w-[70px] h-[70px] rounded-full object-cover'
                        />
                        <div className='font-semibold'>
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
                        <EventHeader title='Events' />
                    </div>
                    <div className='bg-white p-8 rounded-2xl flex-0'>
                        <p className='font-semibold'>Upcoming</p>
                        <div>
                            {events.map(event => (
                                <div className='flex mt-8 items-center' key={event.id}>
                                    <img
                                        src={nftTicketImg}
                                        alt="Event Ticket image"
                                        className='mr-4 w-[50px] h-[50px] rounded-full object-cover'
                                    />
                                    <div className='flex flex-col mr-4'>
                                        <span className='font-semibold text-sm'>{event.title.length > 15 && event.title.slice(0, 15) + ' ...'}</span>
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