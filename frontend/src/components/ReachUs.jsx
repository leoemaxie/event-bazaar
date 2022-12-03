import arrow from '../assets/images/arrow.png'

const ReachUs = () => {
    return (
        <div className='py-14 px-8 md:px-12 lg:p-20'>
            <div className='flex flex-col justify-center items-center max-w-8xl m-auto'>
                <p className='text-darkPurple text-2xl font-semibold mb-6 text-center'>For more information, Reach out to us on</p>
                <form action="">
                    <div className='border-purple border-[1px] flex justify-between rounded-xl px-4 py-2'>
                        <input type="text" placeholder='info@gmail.com' />
                        <img src={arrow} alt="arrow icon" className='hover:scale-75 cursor-pointer' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ReachUs