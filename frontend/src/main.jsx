import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import NavContextProvider from "./contexts/NavContext";
import EventsProvider from "./contexts/EventsContext";
import EventContextProvider from "./contexts/EventContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EventsProvider>
      <EventContextProvider>
        <NavContextProvider>
          <App />
        </NavContextProvider>
      </EventContextProvider>
    </EventsProvider>
  </React.StrictMode>
);
