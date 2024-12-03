import React from "react"
import Image from "next/image"
import Link from "next/link"
import { DEFAULT_PHONE_NUMBER } from "@/constants/base.constant"
import { MdTour } from "react-icons/md"

const description: any = {
  vi: "Khám phá trải nghiệm mua sắm tuyệt vời trên sàn thương mại điện tử đa dịch vụ của chúng tôi và nhận những phần quà đặc biệt hấp dẫn",
  en: "Discover a great tour booking experience on our multi-service e-commerce platform at prices that fit your budget"
}

const Footer = () => {
  return (
    <div className="bg-white w-full shadow-[0_-5px_13px_hsla(210,8%,62%,.2)] max-lg:pb-[90px]">
      <div className=" max-w-[1280px] w-full text-center px-[20px] md:px-[10px] mx-auto">
        <footer className="w-full mx-[auto]">
          <div className="w-full min-h-56 pt-5 justify-center items-start gap-2.5 inline-flex">
            <div className="w-full min-h-48 flex-col justify-center items-start gap-5 inline-flex">
              <div className="w-full justify-between items-start lg:gap-[5%] gap-[0%] lg:grid lg:grid-cols-[40%_55%] grid-cols-[45%_50%] block">
                <div className="mb-3 flex flex-col items-start max-md:gap-[20px] gap-[30px]">
                  <div className="relative text-left">
                    <div className="bg-[#166699] rounded-[8px] py-[10px] px-[20px]">
                      <a href="/" className="text-[30px] flex items-center gap-2">
                        <MdTour size={32} color="white" />
                        <div className="text-[white] font-bold">
                          Booking<span className="text-[black]">Now</span>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="text-[16px] leading-[24px] text-left max-md:text-sm max-md:mx-0">{description["en"]}</div>
                </div>
                <div className="min-h-32 justify-between items-start flex md:flex-row gap-0 md:gap-8 flex-col">
                  <div className="flex-col justify-start items-start gap-[20px] inline-flex mb-3">
                    <div className="text-slate-950 text-base font-bold leading-tight tracking-tight text-left mb-[10px]">Introduction</div>
                    <div className="justify-center items-center gap-2.5 inline-flex">
                      <div className="text-slate-950 text-sm font-normal leading-tight tracking-tight text-left">About us</div>
                    </div>
                    <Link href="/tours" className="Frame5294 justify-center items-center gap-2.5 inline-flex">
                      <div className="text-slate-950 text-sm font-normal leading-tight tracking-tight text-left">Tours</div>
                    </Link>
                    <Link href="/terms-of-use" className="Frame5294 justify-center items-center gap-2.5 inline-flex">
                      <div className="text-slate-950 text-sm font-normal leading-tight tracking-tight text-left">Terms of use</div>
                    </Link>
                  </div>
                  <div className="Frame5302 flex-col justify-start items-start gap-[20px] inline-flex mb-3">
                    <div className="HPTCVLiNKT text-slate-950 text-base font-bold   leading-tight tracking-tight text-left mb-[10px]">Company policy</div>

                    <Link href="/policy/privacy" className="Frame5294 justify-center items-center gap-2.5 inline-flex">
                      <div className="text-slate-950 text-sm font-normal leading-tight tracking-tight text-left">Privacy policy</div>
                    </Link>
                    <Link href="/policy/return" className="Frame5294 justify-center items-center gap-2.5 inline-flex">
                      <div className="text-slate-950 text-sm font-normal leading-tight tracking-tight text-left">Return policy</div>
                    </Link>
                  </div>
                  <div className="Frame5300 flex-col justify-start items-start inline-flex mb-3">
                    <div className="HTrKhChHNg text-slate-950 text-base font-bold   leading-tight tracking-tight text-left mb-[20px]">Customer support</div>
                    <div className="Frame5288 justify-center items-center gap-2.5 inline-flex mb-[20px]">
                      <div className="text-slate-950 text-sm font-normal leading-tight tracking-tight text-left">Hotline: {DEFAULT_PHONE_NUMBER}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full pt-3.5 pb-3 border-t border-black border-opacity-30 sm:justify-center text-left items-center block sm:inline-flex">
                <div className="w-auto justify-center gap-1 items-center inline-flex">
                  <div className="text-black text-base font-normal leading-tight tracking-tight">
                    Created by <span className="text-[#004aad] cursor-pointer">BookingNow</span> ©2024
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Footer
