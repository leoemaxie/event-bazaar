import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import EventContextProvider from './contexts/EventContext'
import FormContextProvider from './contexts/FormContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EventContextProvider>
      <FormContextProvider>
        <App />
      </FormContextProvider>
    </EventContextProvider>
  </React.StrictMode>
)
