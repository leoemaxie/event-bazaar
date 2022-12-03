import { useContext } from "react"
import { EventContext } from "../contexts/EventContext"

const EventHeader = ({ title, showSearch }) => {
    const { handleSearch, handleCategoryChange } = useContext(EventContext)

    return (
        <div className='flex items-center justify-between mb-10 text-textPurple font-semibold'>
            <p className='text-2xl lg:text-4xl'>{title}</p>
            <div className={`${showSearch === 'false' ? 'hidden' : 'flex'} items-center border-[1px] border-whiteShade rounded-xl px-3 ml-2 bg-whiteShade`}>
                <input type="text" id='searchEvent' placeholder='Search' className='outline-none bg-transparent p-2 w-full' onChange={handleSearch} />
            </div>
            <div className={`${showSearch === 'false' ? 'flex' : 'hidden'}`}>
                <div className='bg-whiteShade py-2 px-6 rounded-3xl ml-4'>
                    <select name="free" id="free" className='pr-6 outline-none bg-transparent' onChange={handleCategoryChange}>
                        <option value="">Select</option>
                        <option value="free">Free</option>
                        <option value="paid">Paid</option>
                    </select>
                </div>
                {/* <div className='hidden md:block bg-whiteShade py-2 px-6 rounded-3xl ml-4'>
                    <select name="category" id="category" className='pr-6 outline-none bg-transparent' onChange={handleCategoryChange}>
                        <option value="">Select</option>
                        <option value="metaverse">MetaVerse</option>
                        <option value="web3">Web3</option>
                    </select>
                </div> */}
            </div>
        </div>
    )
}

export default EventHeader