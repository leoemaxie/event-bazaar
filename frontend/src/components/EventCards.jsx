import { Link } from 'react-router-dom'
import { EventContext } from "../contexts/EventContext"
import { useContext } from "react"
import ether from '../assets/images/ethereum.png'
import surf from '../assets/images/surf.jpg'
import Attendants from './Attendants'

const categories = ['All', 'Free', 'Sports', 'Cartoon', 'Virtual World', 'Classic', '3D Abstract', 'Game']

const EventCards = ({ event }) => {
    const { handleClick } = useContext(EventContext)

    return (
        <div className='eventCard'>
            <div className='flex justify-between items-center'>
                <div className='text-white'>
                    <p>Price</p>
                    <div className='flex items-center font-semibold text-blue'><img src={ether} alt="Ethereum" /><span>{event.price} ETH</span></div>
                </div>
                <Link to='/details' onClick={() => handleClick(event.id)}>
                    <button className='bg-blue py-2 px-4 rounded-3xl font-semibold'>
                        Attend
                    </button>
                </Link>
            </div>
            {/* <div className='w-[344px] h-[156px] my-4 border-blue border-[1px]'> */}
            <img src={surf} alt="Event card" className='my-4' />
            {/* </div> */}
            <div className='flex px-2 md:px-4 xl:px-6'>
                <div className='mr-4'>
                    <span className='text-blue text-xs font-semibold'>{event.month}</span>
                    <span className='text-2xl block font-semibold'>{event.date}</span>
                </div>
                <div>
                    <p className='font-semibold mb-2'>{event.title.length > 30 ? event.title.slice(0, 40) + ' ...' : event.title}</p>
                    <span className='text-sm'>{event.details.length > 30 ? event.details.slice(0, 80) + ' ...' : event.details}</span>
                </div>
            </div>
            <div>
                <div className='flex justify-between items-center mt-4'>
                    <div>
                        <p className='font-semibold'>Host</p>
                        <div className='flex mt-2'>
                            <img src={surf} alt="Event Creator" className='w-6 h-6 rounded-full' />
                            <span className='ml-3'>{event.hostName}</span>
                        </div>
                    </div>
                    <Attendants />
                </div>
            </div>
        </div>
    )
}

export default EventCards