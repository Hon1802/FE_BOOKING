"use client"
import * as React from "react"
import Image from "next/image"
import { useTours } from "@/stores/tour"
import { formatCurrencyNoUnit } from "@/helpers/base.helper"
import { useRouter } from "next/navigation"

const LatestTour = () => {
  const [storeTours, actionTours] = useTours()
  const router = useRouter()

  React.useEffect(() => {
    actionTours.getLatestTours({ perPage: 10, currentPage: 1 })
  }, [])

  return (
    <div className="mt-[100px]">
      <div className="text-[33px] mb-[20px] font-bold leading-[33px] text-center uppercase">Latest tours</div>
      <div className="flex max-md:flex-col h-[90vh]">
        <div className="flex-1 relative card-zoom overflow-hidden">
          <Image src={storeTours.latestTours[0]?.images[0]?.urlImage || ""} fill alt="image" className="object-cover" />
          <div className="flex items-center gap-1 justify-center absolute bottom-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)] text-white text-[14px]">
            <div className="mx-[10px] flex flex-col gap-[10px] text-center items-center my-[20px]">
              <div className="text-[20px] font-bold leading-[32px] line-clamp-2 card-title uppercase">{storeTours.latestTours[0]?.name}</div>
              <div className="line-clamp-3 text-[18px] leading-[24px] tracking-[0.08px]">
                Price: <span className="font-bold">{formatCurrencyNoUnit(storeTours.latestTours[0]?.priceAdult)} VND</span>
              </div>
              <div
                onClick={() => router.push(`/tours/${storeTours.latestTours[0]?.id}`)}
                className="cursor-pointer w-[136px] h-[36px] bg-[transparent] rounded-[999px] flex items-center justify-center border-[2px] border-[white] text-[white] uppercase text-[17px]"
              >
                Book Now
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 h-full w-full">
          <div className="grid grid-cols-2 h-full w-full">
            {storeTours.latestTours?.length > 0 &&
              storeTours.latestTours?.slice(2, 6)?.map((item, index) => (
                <div className="relative card-zoom overflow-hidden h-full w-full" key={index}>
                  <Image src={item?.images[0]?.urlImage || ""} fill alt="image" className="object-cover" />
                  <div className="flex items-center gap-1 justify-center absolute left-0 bottom-0 w-full h-full bg-[rgba(0,0,0,0.3)] text-white text-[14px]">
                    <div className="mx-[10px] flex flex-col gap-[10px] text-center items-center my-[20px]">
                      <div className="text-[20px] font-bold leading-[32px] line-clamp-2 card-title uppercase">{item?.name}</div>
                      <div className="line-clamp-3 text-[18px] leading-[24px] tracking-[0.08px]">
                        Price: <span className="font-bold">{formatCurrencyNoUnit(item?.priceAdult)} VND</span>
                      </div>
                      <div
                        onClick={() => router.push(`/tours/${item?.id}`)}
                        className="cursor-pointer w-[136px] h-[36px] bg-[transparent] rounded-[999px] flex items-center justify-center border-[2px] border-[white] text-[white] uppercase text-[17px]"
                      >
                        Book Now
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LatestTour
