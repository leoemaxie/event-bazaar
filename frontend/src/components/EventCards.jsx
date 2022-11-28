import ether from '../assets/images/ethereum.png'
import surf from '../assets/images/surf.jpg'

const categories = ['All', 'Free', 'Sports', 'Cartoon', 'Virtual World', 'Classic', '3D Abstract', 'Game']

const EventCards = ({ event }) => {
    return (
        <div className='eventCard'>
            <div className='flex justify-between items-center'>
                <div className='text-white'>
                    <p>Price</p>
                    <div className='flex items-center font-semibold text-blue'><img src={ether} alt="Ethereum" /><span>{event.price} ETH</span></div>
                </div>
                <button className='bg-blue py-2 px-4 rounded-3xl font-semibold'>Attend</button>
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
                    <div className='flex mr-24'>
                        <img src={surf} alt="Attendees" className='w-8 h-8 rounded-full z-10' />
                        <img src={surf} alt="Attendees" className='w-8 h-8 rounded-full ml-4 absolute z-20' />
                        <img src={surf} alt="Attendees" className='w-8 h-8 rounded-full absolute ml-8 z-30' />
                        <div className='w-8 h-8 rounded-full bg-gray z-40 ml-12 absolute flex items-center text-purple text-xs justify-center'>+30</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventCards