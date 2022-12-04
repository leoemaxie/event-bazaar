import { createContext, useContext, useState } from "react";
import { EventsContext } from "./EventsContext";

export const FormContext = createContext();

const FormContextProvider = ({ children }) => {
  const { giftMyTicket } = useContext(EventsContext);  
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [giftTicket, setGiftTicket] = useState({
    address: "",
  });
  const [openGiftTicket, setOpenGiftTicket] = useState(false);

  const handleOpenGiftTicket = (id) => {
    setOpenGiftTicket(true);
    setSelectedEventId(id);
  };
  const handleCloseGiftTicket = () => {
    setOpenGiftTicket(false);
    setSelectedEventId(null);
  };

  const handleChangeGift = (e) => {
    const { name, value } = e.target;
    setGiftTicket({
      ...giftTicket,
      [name]: value,
    });
  };

  const handleSubmitGift = (e) => {
    e.preventDefault();
    if (selectedEventId) {
        giftMyTicket(giftTicket.address, selectedEventId);
    }
    setGiftTicket({
      address: ""
    });

  };

  return (
    <FormContext.Provider
      value={{
        selectedEventId,
        giftTicket,
        handleChangeGift,
        handleSubmitGift,
        handleCloseGiftTicket,
        openGiftTicket,
        handleOpenGiftTicket,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;
