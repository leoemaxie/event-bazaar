import { EventContext } from "../contexts/EventContext"
import { useContext } from "react"
import calender from '../assets/images/calendar.png'
import location from '../assets/images/location.png'
import nftTicketImg from '../assets/images/nftTicketImg.png'
import ether from '../assets/images/ethereum.png'
import arrowRightWhite from '../assets/images/arrowRightWhite.png'
import Attendants from "../components/Attendants"
import SellTicket from "../components/SellTicket"
import ReachUs from "../components/ReachUs"

const EventDetails = () => {
    const { getEventInfo } = useContext(EventContext)
    console.log(getEventInfo)
    return (
        <>
            <div className="p-6 md:p-8 w-11/12 lg:w-3/4 m-auto max-w-6xl">
                <div className='flex font-semibold'>
                    <div className="flex flex-col mr-8 md:mr-12">
                        <span className="text-sm">{getEventInfo.month}</span>
                        <span className="text-3xl lg:text-4xl">{getEventInfo.date}</span>
                    </div>
                    <p className="text-2xl md:text-4xl">{getEventInfo.title}</p>
                </div>
                <div className="flex flex-col my-8">
                    <div className="flex">
                        <span className="mr-8 md:mr-12">Host</span>
                        <p className="text-textPurple font-semibold pb-2">{getEventInfo.hostName}</p>
                    </div>
                    <div className="flex flex-col md:flex-row mt-4">
                        <div className="hidden rounded bg-gray mr-8 md:mr-12 w-[40px] h-[40px] md:flex justify-center items-center"><img src={calender} alt=" calender icon" className="w-3/4" /></div>
                        <div className="flex flex-col md:w-1/3">
                            <span className="font-semibold">Date and Time</span>
                            <span>{getEventInfo.time}</span>
                        </div>
                        <div className="flex mt-4 md:mt-0">
                            <div className=" hidden rounded bg-gray mr-2 w-[40px] h-[40px] md:flex justify-center items-center"><img src={location} alt="location icon" className="w-3/4" /></div>
                            <div className="flex flex-col">
                                <span className="font-semibold">Location</span>
                                <span className="md:pr-20">Scripture Union Camp of Grace,
                                    Ijede Scripture Union Camp of Grace, Ijede Ikorodu, LA 104102</span>
                            </div>
                        </div>
                    </div>
                </div>
                <img src={nftTicketImg} alt="Ticket NFt picture" />
                <p className="my-8">{getEventInfo.details}</p>
                <div className="flex justify-between">
                    <div className="flex flex-col border-[1px] border-darkPurple p-4">
                        <div className="flex items-center mb-4">
                            <span className="mr-2">Price</span>
                            <img src={ether} alt="Ethereum wallet" /><span>3.2ETH</span>
                        </div>
                        <button className='bg-blue text-white py-2 px-4 rounded-3xl font-semibold flex'>Mint Ticket
                            <img src={arrowRightWhite} alt="arrow" className="ml-8 hover:scale-90" />
                        </button>
                    </div>
                    <div className="hidden md:block"><Attendants /></div>
                </div>
            </div>
            <SellTicket />
            <ReachUs />
        </>
    )
}

export default EventDetails