import CategorySlider from "./CategorySlider"
import { EventContext } from "../contexts/EventContext"
import { useContext } from "react"
import { categories } from '../../event'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Category = () => {
    const { eventCategory, handleCategory } = useContext(EventContext)


    console.log(eventCategory)
    return (
        <div className='py-14 px-8 md:px-12 lg:p-20 bg-gradient-to-tr from-darkPurple to-purple -mt-1'>
            <div className="text-white max-w-8xl m-auto ">
                <hr className="text-lightGray" />
                <p className="text-2xl py-3">Popular Events</p>
                
                <hr className="text-lightGray" />
                <div className='mt-8 '>
                    <CategorySlider />
                </div>
            </div>

        </div>
    )
}

export default Category
