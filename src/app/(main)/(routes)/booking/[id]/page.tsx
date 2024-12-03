"use client"
import { useRouter } from "next/navigation"
import { IoChevronBackSharp } from "react-icons/io5"
import { useEffect, useState } from "react"
import DetailStep from "@/components/pages/booking/StepDetail"
import PaymentStep from "@/components/pages/booking/StepPayment"
import { useBooking } from "@/stores/booking"
import { isSpecialCustomer, naiveRound, formatCurrencyNoUnit } from "@/helpers/base.helper"
import { useTours } from "@/stores/tour"
import { convertDateDefaultV3 } from "@/utilities/ConvertDate"

const Booking = () => {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [store, action] = useBooking()
  const [storeTour, actionTour] = useTours()

  useEffect(() => {
    if (!store.detail || !isSpecialCustomer() || !store.detail.id) {
      history.back()
    } else {
      actionTour.getToursById(store.detail.id)
    }
  }, [])

  return (
    <div className="container mt-[150px] mb-[100px]">
      <div className="flex gap-2 items-center cursor-pointer">
        <IoChevronBackSharp size={23} />
        <div className="text-[14px] hover:underline">{step === 1 ? "Ticket options" : "Your details"}</div>
      </div>
      <div className="text-[14px] mt-5">Step {step} of 2</div>
      <div className="grid grid-cols-[65%_35%] mt-2">
        {step === 1 ? <DetailStep setStep={setStep} /> : <PaymentStep />}
        <div>
          <div className="grid grid-cols-[30%_70%] border-b-[1px] gap-2 border-b-[gray] w-full h-[fit-content] pb-5">
            <div className="w-[100px] h-[100px] rounded-[8px] object-cover overflow-hidden">
              <img src={storeTour.detail?.images[0]?.urlImage} alt="img" className="object-cover h-[100px]" />
            </div>
            <div>
              <div className="text-[16px] font-bold line-clamp-2 h-[50px]">{storeTour.detail?.name}</div>
              <div className="text-[13px]">{convertDateDefaultV3(storeTour.detail?.estimatedTime)}</div>
            </div>
          </div>
          <div className="mt-4 font-bold text-[20px]">{+store.detail?.adultNumber + +store.detail?.childNumber || 0} x Standard ticket</div>
          <div className="flex justify-between items-center mt-2  ">
            <div>{store.detail?.adultNumber} x Adult (age 7-82)</div>
            <div>{formatCurrencyNoUnit(storeTour.detail?.priceAdult * store.detail?.adultNumber)} VND</div>
          </div>
          {store.detail?.childNumber > 0 && (
            <div className="flex justify-between items-center mt-2">
              <div>{store.detail?.childNumber} x Child (age 5-6)</div>
              <div>{formatCurrencyNoUnit(storeTour.detail?.priceChild * store.detail?.childNumber)} VND</div>
            </div>
          )}
          <div className="font-bold flex items-center justify-between mt-3 text-[16px]">
            <div>Total price</div>
            <div>{formatCurrencyNoUnit(store.detail?.totalPrice)} VND</div>
          </div>
          <div>Includes taxes and charges</div>
          {!storeTour.detail?.isApprove && (
            <div className="font-bold flex items-center justify-between mt-3 text-[16px] border-t-[1px] pt-3 border-t-[gray]">
              <div>Deposit 50%</div>
              <div className="text-red-600 font-bold text-[20px]">{formatCurrencyNoUnit(naiveRound(store.detail?.totalPrice * 0.5, 0))} VND</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Booking
