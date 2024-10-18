import { Button, Flex } from 'antd'
import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa';
import { HiOutlineMenuAlt4 } from 'react-icons/hi'
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

function HeaderBottom() {

    const [show, setShow] = useState(false);
    const [showUser, setShowUser] = useState(false);

    return (
        <div className="w-full bg-[#F5F5F3] relative">
            <div className="max-w-container mx-auto">
                <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
                    <div
                        onClick={() => setShow(!show)}
                        className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
                    >
                        <HiOutlineMenuAlt4 className="w-5 h-5" />
                        <p className="text-[14px] font-normal">Shop by Category</p>
                        {show && (
                            <motion.ul
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="absolute top-20 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6"
                            >
                                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                                    Accessories
                                </li>
                                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                                    Furniture
                                </li>
                                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                                    Electronics
                                </li>
                                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                                    Clothes
                                </li>
                                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
                                    Bags
                                </li>
                                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
                                    Home appliances
                                </li>
                            </motion.ul>
                        )}
                    </div>
                    <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
                        <input
                            className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
                            placeholder="Search your products here"
                        />
                    </div>
                    <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
                        <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
                            <Link to="/">
                            <Button
                                className='w-40 h-15 bg-[#FFF]'
                            >
                                Booking
                            </Button>
                            </Link>
                        </div>
                        <div onClick={() => setShowUser(!showUser)} className="flex">
                            <FaUser />
                        </div>
                        {showUser && (
                            <motion.ul
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="absolute top-10 right-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
                            >
                                <Link to="/login">
                                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                                        Login
                                    </li>
                                </Link>
                                <Link onClick={() => setShowUser(false)} to="/register">
                                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                                        Sign Up
                                    </li>
                                </Link>
                                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                                    Profile
                                </li>
                                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
                                    Others
                                </li>
                            </motion.ul>
                        )}
                    </div>
                </Flex>
            </div>
        </div>
    )
}

export default HeaderBottom