import Category from "../components/Category";
import Hero from "../components/Hero";
import UpcomingEvents from "../components/UpcomingEvents";
import SellTicket from "../components/SellTicket";

const Home = () => {
    return (
        <div>
            <Hero />
            <Category />
            <UpcomingEvents />
            <SellTicket />
        </div>
    )
}

export default Home