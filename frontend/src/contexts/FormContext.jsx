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
        ticketLink: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCreateEvent({
            ...createEvent,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(createEvent)
        setCreateEvent(({
            price: '',
            date: '',
            time: '',
            category: '',
            mode: '',
            title: '',
            details: '',
            hostOrg: '',
            timeZone: '',
            ticketLink: ''
        }))
    }

    return (
        <FormContext.Provider value={{ createEvent, handleChange, handleSubmit }}>
            {children}
        </FormContext.Provider>
    )
}

export default FormContextProvider