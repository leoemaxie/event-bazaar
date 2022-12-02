import { createContext, useState } from "react";

export const FormContext = createContext()

const FormContextProvider = ({ children }) => {
    const [createEvent, setCreateEvent] = useState({
        price: '',
        date: '',
        time: '',
        category: '',
        mode: '',
        title: '',
        details: '',
        hostOrg: '',
        timeZone: '',
        ticketImg: ''
    })
    const [giftTicket, setGiftTicket] = useState({
        transferMode: '',
        price: '',
        address: '',
        note: ''
    })
    const [openGiftTicket, setOpenGiftTicket] = useState(false)

    const handleOpenGiftTicket = () => {
        setOpenGiftTicket(true)
    }
    const handleCloseGiftTicket = () => {
        setOpenGiftTicket(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCreateEvent({
            ...createEvent,
            [name]: value
        })
    }

    const handleChangeGift = (e) => {
        const { name, value } = e.target;
        setGiftTicket({
            ...giftTicket,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(createEvent)
        setCreateEvent({
            price: '',
            date: '',
            time: '',
            category: '',
            mode: '',
            title: '',
            details: '',
            hostOrg: '',
            timeZone: '',
            ticketImg: ''
        })
    }

    const handleSubmitGift = (e) => {
        e.preventDefault()
        console.log(giftTicket)
        setGiftTicket({
            transferMode: '',
            price: '',
            address: '',
            note: '',
        })
    }

    return (
        <FormContext.Provider value={{
            createEvent,
            handleChange,
            handleSubmit,
            giftTicket,
            handleChangeGift,
            handleSubmitGift,
            handleCloseGiftTicket,
            openGiftTicket,
            handleOpenGiftTicket
        }}>
            {children}
        </FormContext.Provider>
    )
}

export default FormContextProvider