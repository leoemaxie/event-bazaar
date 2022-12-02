import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import Event from './pages/Event';
import Footer from "./components/Footer";
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';
import GiftTicket from './components/GiftTicket';
import UserProfile from './pages/UserProfile';


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <GiftTicket />
        <Navbar />
        <>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/eventplace' element={<Event />} />
            <Route path='/createEvent' element={<CreateEvent />} />
            <Route path='/details' element={<EventDetails />} />
            <Route path='/userProfile' element={<UserProfile />} />
          </Routes>
        </>
        <Footer />
      </BrowserRouter>
    </div>
  )
}