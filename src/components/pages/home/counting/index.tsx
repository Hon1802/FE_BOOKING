"use client"
import { GrLanguage } from "react-icons/gr"
import { MdPeople } from "react-icons/md"
import { FaAward } from "react-icons/fa"
import { GrUserSettings } from "react-icons/gr"
import * as React from 'react'

const Counting = () => {
    return (
        <>
            <div style={{ backgroundImage: 'url("/banners/banner-counting.webp")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
                className='min-h-[300px] before:bg-[#000] before:bg-opacity-[0.3] before:absolute before:inset-0 relative flex justify-centers items-center'>
                <div className="container z-[1] flex items-center justify-center relative">
                    <div className="w-full flex max-md:flex-col flex flex-row justify-between">
                        <div className="flex flex-col gap-4 items-center">
                            <GrLanguage color="white" size={60} />
                            <div className="text-[50px] text-[#47B5FF]">25+</div>
                            <div className="text-[white] text-[20px]">Amazing Tours</div>
                        </div>
                        <div className="flex flex-col gap-4 items-center">
                            <MdPeople color="white" size={60} />
                            <div className="text-[50px] text-[#47B5FF]">1500+</div>
                            <div className="text-[white] text-[20px]">Happy Travellers</div>
                        </div>
                        <div className="flex flex-col gap-4 items-center">
                            <FaAward color="white" size={60} />
                            <div className="text-[50px] text-[#47B5FF]">25+</div>
                            <div className="text-[white] text-[20px]">International Awards</div>
                        </div>
                        <div className="flex flex-col gap-4 items-center">
                            <GrUserSettings color="white" size={60} />
                            <div className="text-[50px] text-[#47B5FF]">100+</div>
                            <div className="text-[white] text-[20px]">Expert Team</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Counting