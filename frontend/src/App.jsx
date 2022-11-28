import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import Event from './pages/Event';
import Footer from "./components/Footer";
import ReachUs from './components/ReachUs';
import SellTicket from "./components/SellTicket";


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/eventplace' element={<Event />} />
          </Routes>
        </>
        <SellTicket />
        <ReachUs />
        <Footer />
      </BrowserRouter>
    </div>
  )
}