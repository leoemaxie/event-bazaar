import EventCards from '../components/EventCards'
import { upcomingEvents } from '../../event'
import EventHeader from '../components/EventHeader'


const Event = () => {
    return (
        <div className='p-8 md:px-12 lg:px-20 2xl:px-0 max-w-8xl m-auto'>
            <EventHeader title='Events' />
            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-8'>
                {upcomingEvents.map(event => (
                    <EventCards event={event} key={event.id} />
                ))}
            </div>
            <div className='flex justify-center mt-8'>
                <button className='text-blue rounded-3xl border-blue border-[1px] px-8 py-3'>Load More</button>
            </div>
        </div>
    )
}

export default Event