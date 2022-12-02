import { Link } from 'react-router-dom'
import { useState } from 'react'
import ticketLogo from '../assets/images/nftTicketLogo.png'
import person from '../assets/images/person.png'

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState('home')

    const handleActive = (menu) => {
        setActiveMenu(menu)
    }
    return (
        <nav className='bg-darkPurple px-8 md:px-12 lg:px-20 2xl:px-0'>
            <div className='flex justify-between items-center max-w-8xl m-auto h-20'>
                <Link to='/'>
                    <img src={ticketLogo} alt="Ticket Marketplace Logo" className='w-4/5 md:w-full' />
                </Link>
                <ul className='hidden text-white lg:flex text-lg'>
                    <li className={`${activeMenu === 'home' && 'rounded-3xl bg-white text-blue font-semibold'} px-4 mx-4 cursor-pointer`} onClick={() => handleActive('home')}>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className={`${activeMenu === 'event' && 'rounded-3xl bg-white text-blue font-semibold'} px-4 mx-4 cursor-pointer`} onClick={() => handleActive('event')}>
                        <Link to='/eventplace'>Event Place</Link>
                    </li>
                    <li className={`${activeMenu === 'works' && 'rounded-3xl bg-white text-blue font-semibold'} px-4 mx-4 cursor-pointer`} onClick={() => handleActive('works')}><Link to='/createEvent'>Create Event</Link></li>
                </ul>
                <div className='flex items-center'>
                    <button className='hidden md:block text-blue rounded-3xl border-blue border-[1px] px-5 py-2 mr-4'>Connect Wallet</button>
                    <Link to='/userProfile'>
                        <div className='w-11 h-11 bg-blue rounded-full flex justify-center items-center cursor-pointer'>
                            <img src={person} alt="person icon" />
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar