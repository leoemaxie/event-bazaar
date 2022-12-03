import { createContext, useContext, useState } from "react";
import { EventsContext } from "./EventsContext";

export const FormContext = createContext()

const FormContextProvider = ({ children }) => {
    const { registerEvent } = useContext(EventsContext);

    const [createEvent, setCreateEvent] = useState({
        price: '',
        date: '',
        time: '',
        category: '',
        title: '',
        description: '',
        hostOrg: '',
        timeZone: '',
        image: '',
        volume: 0
    })
    const [giftTicket, setGiftTicket] = useState({
        transferMode: '',
        price: '',
        address: '',
        note: ''
    })
    const [openGiftTicket, setOpenGiftTicket] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

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

    const handleSubmitEvent = async (e) => {
        e.preventDefault()
        
        try {
            setIsLoading(true);
            await registerEvent(createEvent);
            setIsLoading(false)
            setCreateEvent({
                price: '',
                date: '',
                time: '',
                category: '',
                title: '',
                description: '',
                hostOrg: '',
                timeZone: '',
                image: '',
                volume: 0
            })   
        } catch (error) {
            setIsLoading(false)
        }
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
            handleSubmitEvent,
            giftTicket,
            handleChangeGift,
            handleSubmitGift,
            handleCloseGiftTicket,
            openGiftTicket,
            handleOpenGiftTicket,
            isLoading
        }}>
            {children}
        </FormContext.Provider>
    )
}

export default FormContextProvider