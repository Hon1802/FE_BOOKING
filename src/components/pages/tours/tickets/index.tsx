import { use, useEffect, useState } from "react"
import { FiMinus } from "react-icons/fi"
import { FaPlus } from "react-icons/fa6"
import { RiErrorWarningLine } from "react-icons/ri"
import { useRouter } from "next/navigation"
import { formatCurrencyNoUnit } from "@/helpers/base.helper"
import { notifyError } from "@/helpers/toast.helper"
import { useBooking } from "@/stores/booking"
import { isSpecialCustomer } from "@/helpers/base.helper"
import { useAuth } from "@/stores/auth"

interface Props {
  priceAdult: number
  priceChild: number
  id: string
}
const Ticket = (props: Props) => {
  const router = useRouter()
  const [adultNumber, setAdultNumber] = useState(0)
  const [childNumber, setChildNumber] = useState(0)
  const [_, action] = useBooking()
  const [storeAuth, actionAuth] = useAuth()

  const onSubmit = (e: any) => {
    if (!isSpecialCustomer()) {
      actionAuth.setOpenLogin(true)
    } else {
      if (adultNumber > 0) {
        action.setBookingData({
          adultNumber,
          childNumber,
          id: props.id,
          totalPrice: adultNumber * props?.priceAdult + childNumber * props?.priceChild
        })
        return router.push(`/booking/${props?.id}`)
      } else notifyError("Please select at least one adult ticket")
    }
  }

  return (
    <div className="border-[1px] rounded-[8px] py-3 px-2 border-[#166699] flex flex-col gap-[20px]">
      <div className="text-[14px] font-bold">Ticket number</div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[14px] font-bold">Adult</div>
          <div className="text-[12px]">{formatCurrencyNoUnit(props?.priceAdult)} VND</div>
        </div>
        <div className="flex items-center gap-5 py-2 px-4 rounded-[8px] border-[1px] border-[#000]">
          <FiMinus
            className="cursor-pointer"
            onClick={() => {
              adultNumber > 0 && setAdultNumber(adultNumber - 1)
            }}
          />
          <div className="cursor-default">{adultNumber}</div>
          <FaPlus className="cursor-pointer" onClick={() => setAdultNumber(adultNumber + 1)} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[14px] font-bold">Child (Height 100 - 139 cm)</div>
          <div className="text-[12px]">{formatCurrencyNoUnit(props?.priceChild)} VND</div>
        </div>
        <div className="flex items-center gap-5 py-2 px-4 rounded-[8px] border-[1px] border-[#000]">
          <FiMinus
            className="cursor-pointer"
            onClick={() => {
              childNumber > 0 && setChildNumber(childNumber - 1)
            }}
          />
          <div className="cursor-default">{childNumber}</div>
          <FaPlus className="cursor-pointer" onClick={() => setChildNumber(childNumber + 1)} />
        </div>
      </div>
      <div>
        <div className="text-[14px] font-normal">Total</div>
        <div className="text-[16px] font-bold">{formatCurrencyNoUnit(adultNumber * props?.priceAdult + childNumber * props?.priceChild)} VND</div>
      </div>
      <div className="py-2 w-full rounded-[8px] bg-[#166699] text-white text-center cursor-pointer" onClick={onSubmit}>
        Confirm
      </div>
      <div className="flex gap-2 items-center">
        <RiErrorWarningLine size={23} />
        Non-refundable
      </div>
    </div>
  )
}

export default Ticket
