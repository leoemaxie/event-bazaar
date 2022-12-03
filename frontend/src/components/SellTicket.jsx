import React from 'react'

const SellTicket = () => {
    return (
        <div className='py-14 px-8 md:px-12 lg:p-20 bg-darkPurple text-white'>
            <div className='flex justify-center items-center max-w-8xl m-auto'>
                <img src="" alt="" className='flex-1 hidden md:block' />
                <div className='flex-1 items-center justify-center md:justify-start md:items-start flex flex-col'>
                    <p className='text-3xl font-semibold'>Not Attending Anymore?</p>
                    <span className='text-sm block pt-4'>Sell / Gift your ticket</span>
                    <button className='bg-gradient-to-tr from-purple to-darkPurple px-8 py-3 mt-8 rounded-3xl font-semibold'>Sell Ticket</button>
                </div>
            </div>
        </div>
    )
}

export default SellTicket