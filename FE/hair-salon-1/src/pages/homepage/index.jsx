import React from "react";
import Banner from "../../components/banner";
import { Badge, Button } from "antd";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";

function HomePage() {
  return (
    <div className="w-full mx-auto">
      <Banner />
      <div className="w-full bg-white border-b-[1px] py-4 border-b-gray-200 px-4">
        <div className="max-w-container mx-auto h-20 flex md:flex-row justify-center items-center">
          <Button
            className='w-50 h-10 bg-[#94B49F] text-2xl font-bold font-titleFont text-amber-50'
          >
            Booking
          </Button>
        </div>
      </div>
      <div className="max-w-container mx-auto px-4">
        <div className="text-3xl font-semibold pb-6 mt-10">
          Service
        </div>
        <div className="flex items-center justify-between h-full flex-wrap gap-3 w-full pb-16">
          <div className="px-2">
            <Service />
          </div>
          <div className="px-2">
            <Service />
          </div>
          <div className="px-2">
            <Service />
          </div>
          <div className="px-2">
            <Service />
          </div>
          <div className="px-2">
            <Service />
          </div>
          <div className="px-2">
            <Service />
          </div>
          <div className="px-2">
            <Service />
          </div>
          <div className="px-2">
            <Service />
          </div>
        </div>
      </div>
    </div>
  )
}

const Service = () => {
  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
        <div>
          <img src="src/assets/images/spfFour.webp" alt="" className="w-full h-full" />
        </div>
        <div className="absolute top-6 left-8">
          <Badge text="New" />
        </div>
        <div className="w-full h-20 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
              Compare
              <span>
                <GiReturnArrow />
              </span>
            </li>
            <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
              Add to Cart
              <span>
                <FaShoppingCart />
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">
            Name
          </h2>
          <p className="text-[#767676] text-[14px]">10$</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage;