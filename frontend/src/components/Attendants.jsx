import surf from '../assets/images/surf.jpg'

const Attendants = () => {
    return (
        <div className='flex mr-24 xl:mr-32'>
            <img src={surf} alt="Attendees" className='w-8 h-8 rounded-full z-10' />
            <img src={surf} alt="Attendees" className='w-8 h-8 rounded-full ml-4 absolute z-20' />
            <img src={surf} alt="Attendees" className='w-8 h-8 rounded-full absolute ml-8 z-30' />
            <div className='w-8 h-8 rounded-full bg-gray z-40 ml-12 absolute flex items-center text-purple text-xs justify-center'>+30</div>
        </div>
    )
}

export default Attendants