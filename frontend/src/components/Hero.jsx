import { Link } from 'react-router-dom'
import { useContext } from "react"
import { FormContext } from "../contexts/FormContext"
import divider from '../assets/images/divider.png'

const Hero = () => {
    return (
        <div className='py-14 px-8 md:px-12 lg:p-20 bg-gradient-to-tl from-purple to-darkPurple'>
            <div className='flex max-w-8xl m-auto'>
                <div className='text-white'>
                    <h1 className='text-5xl md:text-6xl lg:text-8xl font-bold'>Create and <br />attend Events</h1>
                    <p className='my-8 max-w-lg text-lg'>Create events, gift or sell event ticket, and lots more. Discover and connect with more people all over the world.</p>
                    <img src={divider} alt="divider" className='-ml-16' />
                    <Link to='/createEvent'>
                        <button className='bg-blue px-8 py-3 mt-8 rounded-3xl font-semibold hover:border-[1px] hover:border-blue hover:bg-transparent mr-6'>Create Event</button>
                    </Link>
                    <Link to='/userProfile'>
                        <button
                            className='bg-transparent px-8 py-3 mt-8 rounded-3xl font-semibold border-blue border-[1px] hover:border-none hover:bg-darkPurple'
                        >
                            Gift Ticket
                        </button>
                    </Link>
                </div>
                <div className=''></div>
            </div>
        </div>
    )
}

export default Hero