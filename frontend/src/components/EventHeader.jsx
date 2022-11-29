import React from 'react'

const EventHeader = ({ title }) => {
    return (
        <div className='flex items-center justify-between mb-10 text-textPurple font-semibold'>
            <p className='text-2xl lg:text-4xl'>{title}</p>
            <div className='flex'>
                <div className='bg-lightBlue py-2 px-6 rounded-3xl ml-4'>
                    <select name="free" id="free" className='pr-6 bg-transparent'>
                        <option value="all">Select</option>
                        <option value="free">Free</option>
                        <option value="paid">Paid</option>
                    </select>
                </div>
                <div className='hidden md:block bg-lightBlue py-2 px-6 rounded-3xl ml-4'>
                    <select name="category" id="category" className='pr-6 bg-transparent'>
                        <option value="all">Select</option>
                        <option value="metaverse">MetaVerse</option>
                        <option value="web3">Web3</option>
                    </select>
                </div>
                <div className='hidden md:block bg-lightBlue py-2 px-6 rounded-3xl ml-4'>
                    <select name="eventType" id="eventType" className='pr-6 bg-transparent'>
                        <option value="all">Select</option>
                        <option value="virtual">Virtual</option>
                        <option value="physical">Physical</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default EventHeader