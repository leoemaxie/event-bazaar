import ticketLogo from '../assets/images/nftTicketLogo.png'

const Footer = () => {
    return (
        <footer className='p-8 md:px-12 lg:px-20 bg-blackShade lg:py-16 text-white'>
            <div className='flex justify-between text-sm max-w-8xl m-auto flex-wrap'>
                <div className='max-w-xs mb-8'>
                    <img src={ticketLogo} alt="Ticket Marketplace" />
                    <p>NFT Ticket is a global self-service ticketing platform for live experiences that allows anyone to create, share, find and attend events that fuel their passions and enrich their lives.</p>
                </div>
                <div className='mb-8'>
                    <p className='text-lg font-semibold mb-4'>Plan Event</p>
                    <ul>
                        <li className='mb-2'>Create Event</li>
                        <li className='mb-2'>Sell Tickets</li>
                        <li className='mb-2'>Events</li>
                    </ul>
                </div>
                <div className='mb-8'>
                    <p className='text-lg font-semibold mb-4'>Ticket MarketPlace</p>
                    <ul>
                        <li className='mb-2'>About Us</li>
                        <li className='mb-2'>How it works</li>
                        <li className='mb-2'>Terms</li>
                        <li className='mb-2'>Contact Us</li>
                    </ul>
                </div>
                <div className='max-w-xs mb-8'>
                    <p className='text-lg font-semibold mb-4'>Stay In The Loop</p>
                    <p>Join our mailing list to stay in the loop with our newest for Event and concert</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer