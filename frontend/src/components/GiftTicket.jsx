import { useContext } from "react"
import { FormContext } from "../contexts/FormContext"
import close from '../assets/images/close.png'

const style = {
    input: `my-1 border-[1px] rounded-lg p-2 px-4 border-darkPurple`,
    inputContainer: `flex flex-col w-full`,
    labelContainer: `flex flex-col`,
    label: `font-semibold mt-2 text-darkPurple`
}

const GiftTicket = () => {
    const { openGiftTicket, handleCloseGiftTicket, giftTicket, handleChangeGift, handleSubmitGift } = useContext(FormContext)

    return (
        <div className={`${openGiftTicket ? 'block' : 'hidden'}  w-full h-full flex items-center justify-center z-50 fixed left-0 bg-blackShade/[.6]`}>
            <div className='bg-white rounded-3xl p-6 md:p-8 mx-8 md:mx-0'>
                <div className="flex justify-between items-center mb-4">
                    <p className='text-lg md:text-2xl font-semibold'>Not attending an event anymore?</p>
                    <div className="bg-blue p-2 rounded flex justify-center ml-8 md:ml-16 cursor-pointer" onClick={handleCloseGiftTicket}>
                        <img src={close} alt="close icon" className="w-1/2" />
                    </div>
                </div>
                <form action="" onSubmit={handleSubmitGift}>
                    <div className={`${style.labelContainer} md:mr-8`}>
                        <label htmlFor="transferMode" className={style.label}>Transfer NFT Ticket</label>
                        <div className='flex mt-2'>
                            <label htmlFor="sell" className='mr-6'>
                                <input
                                    type="radio"
                                    value='sell'
                                    name='transferMode'
                                    id='sell'
                                    className='mr-2'
                                    checked={giftTicket.transferMode === 'sell'}
                                    onChange={handleChangeGift}
                                />
                                Sell
                            </label>
                            <label htmlFor="gift">
                                <input
                                    type="radio"
                                    value='gift'
                                    name='transferMode'
                                    id='gift'
                                    className='mr-2'
                                    checked={giftTicket.transferMode === 'gift'}
                                    onChange={handleChangeGift}
                                />Gift
                            </label>
                        </div>
                    </div>
                    <div className={style.inputContainer}>
                        <label htmlFor="address" className={style.label}>Recipient</label>
                        <input
                            type="text"
                            id='address'
                            name='address'
                            placeholder='wallet Address 0x...'
                            className={style.input}
                            value={giftTicket.address}
                            onChange={handleChangeGift}
                        />
                    </div>
                    <div className={style.labelContainer}>
                        <label htmlFor="note" className={style.label}>Note</label>
                        <textarea
                            type="text"
                            id='note'
                            name='note'
                            placeholder='Enter message here..'
                            className={style.input}
                            value={giftTicket.note}
                            onChange={handleChangeGift}
                        >
                        </textarea>
                    </div>
                    <div className='flex justify-center text-white'>
                        <button className='bg-blue px-8 py-3 mt-4 rounded-3xl font-semibold hover:bg-darkPurple'>Transfer</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default GiftTicket