import { useContext } from "react"
import { FormContext } from "../contexts/FormContext"

const style = {
    input: `my-2 border-[1px] rounded-lg p-2 px-4 border-darkPurple`,
    inputContainer: `flex flex-col w-full`,
    labelContainer: `flex flex-col`,
    label: `font-semibold mt-6 text-darkPurple`
}

const CreateEvent = () => {
    const { createEvent, handleChange, handleSubmit } = useContext(FormContext)
    return (
        <div className=' bg-gradient-to-br from-darkPurple to-purple p-4 md:px-12 lg:px-20 2xl:px-0'>
            <div div className='bg-white rounded-3xl p-4 md:p-8 w-11/12 lg:w-3/4 m-auto max-w-6xl' >
                <p className='text-2xl lg:text-4xl font-semibold mb-4'>Create Event</p>
                <form action="" onSubmit={handleSubmit}>
                    <span className='text-blue text-sm font-semibold'>* Mandatory Information</span>
                    <div className='md:flex'>
                        <div className={`${style.inputContainer} md:mr-6`}>
                            <label htmlFor="title" className={style.label}>Name of Event*</label>
                            <input
                                type="text"
                                id='title'
                                name='title'
                                placeholder='NFT Event 2022'
                                className={style.input}
                                value={createEvent.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={style.inputContainer}>
                            <label htmlFor="hostOrg" className={style.label}>Host Organisation Name*</label>
                            <input
                                type="text"
                                id='hostOrg'
                                name='hostOrg'
                                placeholder='NFT Event 2022'
                                className={style.input}
                                value={createEvent.hostOrg}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='md:flex'>
                        <div className={`${style.labelContainer} md:mr-8`}>
                            <label htmlFor="mode" className={style.label}>Mode of Event*</label>
                            <div className='flex mt-4'>
                                <label htmlFor="free" className='mr-6'>
                                    <input
                                        type="radio"
                                        value='free'
                                        name='mode'
                                        id='free'
                                        className='mr-2'
                                        checked={createEvent.mode === 'free'}
                                        onChange={handleChange}
                                    />
                                    Free
                                </label>
                                <label htmlFor="paid">
                                    <input
                                        type="radio"
                                        value='paid'
                                        name='mode'
                                        id='paid'
                                        className='mr-2'
                                        checked={createEvent.mode === 'paid'}
                                        onChange={handleChange}
                                    />Paid
                                </label>
                            </div>
                        </div>
                        <div className={style.labelContainer}>
                            <label htmlFor="price" className={style.label}>Price (USD)*</label>
                            <input
                                type="number"
                                id='price'
                                name='price'
                                className={style.input}
                                value={createEvent.price}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='md:flex'>
                        <div className={`${style.inputContainer} md:mr-6`}>
                            <label htmlFor="date" className={style.label}>Date of Event*</label>
                            <input
                                type="date"
                                id='date'
                                name='date'
                                className={style.input}
                                value={createEvent.date}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={style.inputContainer}>
                            <label htmlFor="time" className={style.label}>Time of Event*</label>
                            <input
                                type="time"
                                id='time'
                                name='time'
                                className={style.input}
                                value={createEvent.time}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='md:flex'>
                        <div className={`${style.inputContainer} md:mr-6 flex-1`}>
                            <label htmlFor="category" className={style.label}>Select Category*</label>
                            <select
                                name="category"
                                id="category"
                                className={style.input}
                                value={createEvent.category}
                                onChange={handleChange}
                            >
                                <option value="select">Select Event Category</option>
                                <option value="nft">Nft</option>
                                <option value="game">Game</option>
                                <option value="metaverse">Metaverse</option>
                            </select>
                        </div>
                        <div className={`${style.inputContainer} flex-1`}>
                            <label htmlFor="timeZone" className={style.label}>Select TimeZone*</label>
                            <select
                                name="timeZone"
                                id="timeZone"
                                className={style.input}
                                value={createEvent.timeZone}
                                onChange={handleChange}
                            >
                                <option value="select">Select TimeZone</option>
                                <option value="wat">WAT</option>
                                <option value="est">EST</option>
                                <option value="gmt">GMT</option>
                            </select>
                        </div>
                    </div>
                    <div className={style.inputContainer}>
                        <label htmlFor="ticketLink" className={style.label}>Select Event Ticket Image*</label>
                        <input
                            type="file"
                            id='ticketImg'
                            name='ticketImg'
                            value={createEvent.ticketImg}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={style.labelContainer}>
                        <label htmlFor="details" className={style.label}>Event Description*</label>
                        <textarea
                            type="text"
                            id='details'
                            name='details'
                            placeholder='NFT Event 2022'
                            className={`${style.input} h-40`}
                            value={createEvent.details}
                            onChange={handleChange}
                        >
                        </textarea>
                    </div>
                    <div className='flex justify-center text-white'>
                        <button className='bg-blue px-8 py-3 mt-8 rounded-3xl font-semibold hover:bg-darkPurple'>Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateEvent