import { useContext } from "react"
import { EventsContext } from "../contexts/EventsContext"

const EventHeader = ({ title, showSearch }) => {
    const { handleSearch, handleCategoryChange } = useContext(EventsContext)

    return (
        <div className='flex items-center justify-between mb-10 text-textPurple font-semibold'>
            <p className='text-2xl lg:text-4xl'>{title}</p>
            <div className={`${showSearch === 'false' ? 'hidden' : 'flex'} items-center border-[1px] border-whiteShade rounded-xl px-3 ml-2 bg-whiteShade`}>
                <input type="text" id='searchEvent' placeholder='Search' className='outline-none bg-transparent p-2 w-full' onChange={handleSearch} />
            </div>
           
        </div>
    )
}

export default EventHeader