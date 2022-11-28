import CategorySlider from "./CategorySlider"

const Category = () => {
    return (
        <div className='py-14 px-8 md:px-12 lg:p-20 bg-gradient-to-tr from-darkPurple to-purple -mt-1'>
            <div className="text-white max-w-8xl m-auto ">
                <hr className="text-lightGray" />
                <p className="text-2xl py-3">Popular search</p>
                <div className="mb-6 flex items-center">
                    <button className='bg-blue py-2 px-4 rounded-3xl font-semibold mr-12'>Attend</button>
                    <button className='bg-inherit border-[1px] border-blue mr-12 py-2 px-4 rounded-3xl font-semibold'>Game</button>
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
