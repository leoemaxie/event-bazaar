import surf from '../assets/images/surf.jpg'

const Attendants = ({ volume }) => {
    return (
        <div className='flex mr-24 xl:mr-32'>
            <img src={surf} alt="Attendees" className='w-10 h-10 rounded-full z-10' />
            <img src={surf} alt="Attendees" className='w-10 h-10 rounded-full ml-4 absolute z-20' />
            <img src={surf} alt="Attendees" className='w-10 h-10 rounded-full absolute ml-8 z-30' />
            <div className='w-10 h-10 rounded-full bg-gray z-40 ml-12 absolute flex items-center text-purple text-xs justify-center'>{Number(volume) > 3 ? `+${Number(volume) - 3}` : `${Number(volume)}`}</div>
        </div>
    )
}

export default Attendants