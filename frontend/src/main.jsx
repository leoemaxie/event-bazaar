import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import NavContextProvider from "./contexts/NavContext";
import EventsProvider from "./contexts/EventsContext";
import FormContextProvider from "./contexts/FormContext";
import EventContextProvider from "./contexts/EventContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EventsProvider>
      <FormContextProvider>
        <EventContextProvider>
          <NavContextProvider>
            <App />
          </NavContextProvider>
        </EventContextProvider>
      </FormContextProvider>
    </EventsProvider>
  </React.StrictMode>
);
