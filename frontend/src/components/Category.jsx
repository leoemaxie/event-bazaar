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
                <p className="text-2xl py-3">Popular search</p>
                <div className="mb-1 flex items-center justify-center md:hidden">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={0}
                        centeredSlides={false}
                        navigation={true}
                        modules={[Navigation]}
                    // className='-mx-4'
                    >
                        {categories.map((category, index) => (
                            <SwiperSlide key={index}>
                                <button
                                    key={index}
                                    value={category.value}
                                    className={`${category.value === eventCategory ? 'bg-blue' : ''} bg-inherit border-[1px] border-blue py-2 px-4 rounded-3xl font-semibold ml-10`}
                                    onClick={handleCategory}
                                >
                                    {category.name}
                                </button>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="mb-6 flex items-center">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            value={category.value}
                            className={`${category.value === eventCategory ? 'bg-blue' : ''} hidden md:block bg-inherit border-[1px] border-blue py-2 px-4 rounded-3xl font-semibold mr-12`}
                            onClick={handleCategory}
                        >
                            {category.name}
                        </button>
                    ))}

                    {/* <button className={`${category === 'game' ? 'bg-blue' : ''} bg-inherit border-[1px] border-blue mr-12 py-2 px-4 rounded-3xl font-semibold`} onClick={() => filterByCategory('game')}>Game</button> */}
                    {/* <button className='bg-inherit border-[1px] border-blue mr-12 py-2 px-4 rounded-3xl font-semibold'>Metaverse</button> */}
                </div>
                <hr className="text-lightGray" />
                <div className='mt-8 '>
                    <CategorySlider />
                </div>
            </div>

        </div>
    )
}

export default Category
