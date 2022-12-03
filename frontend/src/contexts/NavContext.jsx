import { createContext, useState } from "react";

export const NavContext = createContext()

const NavContextProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState('home')
    const handleActive = (menu) => {
        setActiveMenu(menu)
    }

    return (
        <NavContext.Provider value={{ activeMenu, handleActive }}>
            {children}
        </NavContext.Provider>
    )
}

export default NavContextProvider