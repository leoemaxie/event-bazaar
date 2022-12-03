import Category from "../components/Category";
import Hero from "../components/Hero";
import ReachUs from "../components/ReachUs";
import SellTicket from "../components/SellTicket";
import UpcomingEvents from "../components/UpcomingEvents";

const Home = () => {
    return (
        <div>
            <Hero />
            <Category />
            <UpcomingEvents />
            <SellTicket />
            <ReachUs />
        </div>
    )
}

export default Home