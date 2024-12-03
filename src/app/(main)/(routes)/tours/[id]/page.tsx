"use client"
import Gallery from "@/components/pages/tours/gallery"
import { CiLocationOn } from "react-icons/ci"
import { FaPhone } from "react-icons/fa"
import { MdAccessTime } from "react-icons/md"
import Info from "@/components/pages/tours/info"
import Ticket from "@/components/pages/tours/tickets"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useTours } from "@/stores/tour"
import { GoLocation } from "react-icons/go"

export default function TourDetail() {
  const { id } = useParams()
  const [store, actionTours] = useTours()

  useEffect(() => {
    if (id) {
      actionTours.getToursById(id as string)
    }
  }, [id])

  return (
    <>
      <div className="container mt-[170px] flex flex-col gap-[20px] mb-[5rem]">
        <div className="text-[33px] font-bold leading-[33px] uppercase">{store?.detail?.name}</div>
        <div className="flex items-center gap-2">
          <CiLocationOn size={23} />
          <span>{store?.detail?.location}</span>
        </div>
        <div>
          <Gallery images={store?.detail?.images} />
        </div>
        <div className="grid grid-cols-[60%_40%] max-md:flex-col-reverse max-md:flex">
          <div className="left-content flex flex-col gap-[20px]">
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <FaPhone color="#008234" size={21} />
                <div className="text-[#008234] font-bold">Call for advanced booking:</div>
              </div>
              <a className="cursor-pointer font-bold" href="tel:091231233">
                {store?.detail?.phone}
              </a>
            </div>
            <div className="flex gap-2 items-center">
              <MdAccessTime size={23} />
              <span className="font-bold text-[16px]">
                Duration: {store?.detail?.duration} {store?.detail?.duration > 1 ? "days" : "day"}
              </span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: (store?.detail?.description as string) || "" }} className="text-[16px]"></div>
            <div className="flex flex-col gap-[10px]">
              <div className="text-[20px] font-bold">Regulations</div>
              <div dangerouslySetInnerHTML={{ __html: (store?.detail?.regulation as string) || "" }} />
            </div>
            <div className="flex flex-col gap-[20px] cursor-pointer">
              <div className="text-[20px] font-bold">Address</div>
              <div className="flex gap-2">
                <span>
                  <GoLocation color="#5c5a72" size={24} />
                </span>
                <a target="_blank" href={`http://maps.google.com/?q=${store?.detail?.address}`}>
                  {store?.detail?.address}
                </a>
              </div>
            </div>
            <div>
              <div className="text-[20px] font-bold">Plan</div>
              <div dangerouslySetInnerHTML={{ __html: (store?.detail?.plan as string) || "" }} />
            </div>
          </div>
          <div className="right-content ml-[30px] max-md:ml-0">
            <div className="mb-[15px] flex flex-col gap-[15px]">
              <div className="text-[20px] font-bold">Details and prices</div>
            </div>
            <Info hotel={store?.detailHotel} transportation={store?.detailVehicle} detail={store?.detail} />
            <Ticket priceAdult={store?.detail?.priceAdult} priceChild={store?.detail?.priceChild} id={store?.detail?.id} />
          </div>
        </div>
      </div>
    </>
  )
}
