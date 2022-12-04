import { useContext, useState } from "react";
import close from "../assets/images/close.png";
import { EventsContext } from "../contexts/EventsContext";
import { FormContext } from "../contexts/FormContext";

const style = {
  input: `my-1 border-[1px] rounded-lg p-2 px-4 border-darkPurple`,
  inputContainer: `flex flex-col w-full`,
  labelContainer: `flex flex-col`,
  label: `font-semibold mt-2 text-darkPurple`,
};

const GiftTicket = () => {
  const {
    openGiftTicket,
    handleCloseGiftTicket,
    giftTicket,
    selectedEventId,
    handleChangeGift,
    setGiftTicket,
    handleSubmitGift
    
  } = useContext(FormContext);
  
  return (
    <div
      className={`${
        openGiftTicket ? "block" : "hidden"
      }  w-full h-full flex items-center justify-center z-50 fixed left-0 bg-blackShade/[.6]`}
    >
      <div className="bg-white rounded-3xl p-6 md:p-8 mx-8 md:mx-0">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg md:text-2xl font-semibold">
            Not attending an event anymore?
          </p>
          <div
            className="bg-blue p-2 rounded flex justify-center ml-8 md:ml-16 cursor-pointer"
            onClick={handleCloseGiftTicket}
          >
            <img src={close} alt="close icon" className="w-1/2" />
          </div>
        </div>
        <form action="" onSubmit={handleSubmitGift}>
          <div className={`${style.labelContainer} md:mr-8`}>
            <label htmlFor="transferMode" className={style.label}>
              Gift your Ticket
            </label>
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="address" className={style.label}>
              Recipient Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="wallet Address 0x..."
              className={style.input}
              value={giftTicket.address}
              onChange={handleChangeGift}
              required
            />
          </div>
          <div className="flex justify-center text-white">
            <button
                type="submit"
              className="bg-blue px-8 py-3 mt-4 rounded-3xl font-semibold hover:bg-darkPurple"
            >
              Transfer Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GiftTicket;
