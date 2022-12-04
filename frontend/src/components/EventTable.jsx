import { EventsContext } from "../contexts/EventsContext";
import { FormContext } from "../contexts/FormContext";
import { useContext } from "react";

const style = {
  row: `py-4 pl-6 md:pl-8 text-left font-medium`,
};

const EventTable = ({ tickets }) => {
  const { relistMyTicket } = useContext(EventsContext);
  const { handleOpenGiftTicket } = useContext(FormContext);

  return (
    <div className="bg-white rounded-xl overflow-auto">
      <table className="w-full">
        <thead className="text-lightGray border-b-[1px] border-gray font-bold">
          <tr>
            <th className={style.row}>#</th>
            <th className={style.row}>Event Title</th>
            <th className={style.row}>Date</th>
            <th className={`${style.row}`}>Gift Ticket</th>
            <th className={`${style.row} pr-0`}>Relist Ticket</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((event, index) => (
            <tr key={index} className="hover:bg-whiteShade">
              <td className={style.row}>{index + 1}</td>
              <td className={`${style.row} text-[15px]`}>
                {event.title.length > 30
                  ? event.title.slice(0, 30) + " ..."
                  : event.title}
              </td>
              <td className={style.row}>
                {event.month} {event.date}
              </td>
              <td className={`${style.row}`}>
                <button
                  onClick={() => {
                    handleOpenGiftTicket(event.eventId);
                  }}
                  className="bg-gradient-to-r from-blueShade to-blue text-white px-3 py-2 rounded-full mr-4"
                >
                  Gift
                </button>
              </td>
              <td className={`${style.row} pr-0`}>
                <button
                  onClick={() => {
                    relistMyTicket(event.eventId);
                  }}
                  className="bg-gradient-to-r from-blueShade to-blue text-white px-3 py-2 rounded-full mr-4"
                >
                  Relist
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
