"use client"
import { useRouter, useParams } from "next/navigation"
import { FaCircleXmark } from "react-icons/fa6"
import { useBooking } from "@/stores/booking"
import { useEffect, useState } from "react"
import { useLogin } from "@/hooks/useLogin"
import { convertDateDefaultV3, getDateTimeString } from "@/utilities/ConvertDate"
import moment from "moment"
import Link from "next/link"
import { notifyError, notifySuccess } from "@/helpers/toast.helper"
import ConfirmModal from "@/components/common/modal/ConfirmModal"
import { Chip } from "@mui/material"
import { ORDER_STATUS, PAYMENT_STATUS } from "@/constants/base.constant"
import { formatCurrencyNoUnit, naiveRound } from "@/helpers/base.helper"
import Paypal from "@/components/pages/my-trip/Paypal"

const paymentStatusObjColor = (status: string) => {
  switch (status) {
    case PAYMENT_STATUS.NEW_REQUEST:
      return "primary"
    case PAYMENT_STATUS.DEPOSIT_ADVANCE:
      return "warning"
    case PAYMENT_STATUS.COMPLETED:
      return "success"
    default:
      break
  }
}

const orderStatusObjColor = (status: string) => {
  switch (status) {
    case ORDER_STATUS.WAITING_CONFIRM:
      return "warning"
    case ORDER_STATUS.REFUND_COMPLETED:
    case ORDER_STATUS.COMPLETED:
      return "success"
    case ORDER_STATUS.CANCELLED:
    case ORDER_STATUS.CANCELLED_BY_ADMIN:
      return "error"
    default:
      break
  }
}

const renderOrderStatus = (status: string) => {
  switch (status) {
    case ORDER_STATUS.WAITING_CONFIRM:
      return "Waiting confirm"
    case ORDER_STATUS.REFUND_COMPLETED:
      return "Refund completed"
    case ORDER_STATUS.CANCELLED:
      return "Cancelled by customer"
    case PAYMENT_STATUS.COMPLETED:
      return "Completed"
    case ORDER_STATUS.CANCELLED_BY_ADMIN:
      return "Cancelled by admin"
    default:
      break
  }
}
const renderPaymentStatus = (status: string) => {
  switch (status) {
    case PAYMENT_STATUS.NEW_REQUEST:
      return "New request"
    case PAYMENT_STATUS.DEPOSIT_ADVANCE:
      return "Deposit advance"
    case PAYMENT_STATUS.COMPLETED:
      return "Completed"
    default:
      break
  }
}

const MyTripDetail = () => {
  const router = useRouter()
  const [store, action] = useBooking()
  const isSpecial = useLogin()
  const { id } = useParams()
  const [confirmCancel, setConfirmCancel] = useState(false)

  useEffect(() => {
    action.getOrderDetail(id as string)
  }, [])

  const handleCancelOrder = () => {
    action.cancelOrder(
      { orderStatus: "CANCELLED", bookingId: id as string },
      () => {
        notifySuccess("Cancel order successfully")
        setConfirmCancel(false)
        action.getOrderDetail(id as string)
      },
      notifyError
    )
  }

  return isSpecial ? (
    <div className="container mt-[150px] mb-6">
      <div className="font-bold text-[25px] mb-5">Check your information</div>
      <div className="grid grid-cols-[68%_30%] gap-4">
        <div className="shadow-[rgba(0,0,0,0.12)_0px_0px_8px] rounded-[3px] overflow-hidden py-[20px] px-[10px]">
          <div className="mb-3 underline text-[#006ce4] text-[20px] font-bold cursor-pointer w-fit" onClick={() => router.push("/tours/1")}>
            {store?.detail?.tourName}
          </div>
          <div className="flex flex-col gap-[15px] border-b-[2px] pb-[20px]">
            <div className="flex justify-between">
              <div className="font-bold">Order status</div>
              <Chip className="capitalize" color={orderStatusObjColor(store?.detail?.orderStatus)} label={renderOrderStatus(store?.detail?.orderStatus) || "---"} />
            </div>
            <div className="flex justify-between">
              <div className="font-bold">Ticket types</div>
              <div>
                {store?.detail?.ticketChild > 0 && `${store?.detail?.ticketChild} x Child &`} {store?.detail?.ticketAdult} x Adult
              </div>
            </div>
            <div className="flex justify-between">
              <div className="font-bold">Date</div>
              <div>
                {convertDateDefaultV3(store?.detail?.estimateDate)} - {moment(store?.detail?.estimateDate).add(+store?.detail?.duration, "days").format("DD/MM/YYYY")}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="font-bold">Duration</div>
              <div>{store?.detail?.duration} day</div>
            </div>
          </div>
          <div className="flex justify-between mt-3">
            <div>{store?.detail?.ticketAdult} x Adult</div>
            <div>{formatCurrencyNoUnit(store?.detail?.adultPrice * store?.detail?.ticketAdult)} VND</div>
          </div>
          {store?.detail?.ticketChild > 0 && (
            <div className="flex justify-between mt-3">
              <div>{store?.detail?.ticketChild} x Child</div>
              <div>{formatCurrencyNoUnit(store?.detail?.childPrice * store?.detail?.ticketChild)} VND</div>
            </div>
          )}
          <div className="flex justify-between mt-3">
            <div className="text-[#006ce4] font-bold text-[20px]">Total Price</div>
            <div className="text-[#006ce4] font-bold text-[20px]">{store?.detail?.totalAmount} VND</div>
          </div>
          {store?.detail?.paymentStatus === PAYMENT_STATUS.DEPOSIT_ADVANCE && (
            <div className="flex justify-between mt-3 border-b-[2px] mb-2 pb-[20px]">
              <div className="font-bold text-[#e0bc00]">Deposit advance</div>
              <div className="text-[#e0bc00] font-bold">{formatCurrencyNoUnit(store?.detail?.depositAmount)} VND</div>
            </div>
          )}
          <div className="px-2 bg-[#006ce4] bg-opacity-[0.1] pt-3">
            <div className="flex justify-between mt-3">
              <div className="text-[16px] font-bold mb-3">Payment detail</div>
            </div>
            <div className="flex justify-between">
              <div className="text-[16px]">Payment status</div>
              <Chip className="capitalize" color={paymentStatusObjColor(store?.detail?.paymentStatus)} label={renderPaymentStatus(store?.detail?.paymentStatus) || "---"} />
            </div>
            <div className="flex justify-between mt-3">
              <div className="text-[16px]">Method</div>
              <div className="text-[16px]">E-wallet</div>
            </div>
            <div className="flex justify-between mt-3">
              <div className="text-[16px]">Code</div>
              <div className="text-[16px]">{store?.detail?.paymentId}</div>
            </div>
            <div className="flex justify-between mt-3">
              <div className="text-[16px]">Time</div>
              <div className="text-[16px]">{getDateTimeString(store?.detail?.updatedAt)}</div>
            </div>
            <div className="flex justify-between mt-3 pb-3">
              <div className="text-[16px]">Payer name</div>
              <div className="text-[16px]">{store?.detail?.payerName}</div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-[20px] font-bold mb-3">Is all the information accurate?</div>
          <div className="text-[14px]">You can always view and change your tour settings online - no need to re-register</div>
          <div className="flex items-center gap-2 mt-3">
            <FaCircleXmark size={16} />
            <div className="cursor-pointer text-[#006ce4] underline" onClick={() => setConfirmCancel(true)}>
              Cancel this tour
            </div>
          </div>
          <Link href={"/policy/return"}>
            <div className="text-[14px] mt-4">
              See more about <span className="text-[#006ce4] underline cursor-pointer">Cancellation Policy</span>
            </div>
          </Link>
          {store?.detail?.paymentStatus === PAYMENT_STATUS.DEPOSIT_ADVANCE && (
            <>
              <div className="my-3 text-red-600 font-bold">Pay the remaining amount: {formatCurrencyNoUnit(store?.detail?.totalAmount - store?.detail?.depositAmount)} VND</div>
              <Paypal amount={naiveRound(store.detail?.totalPrice - store?.detail?.depositAmount, 0)} />
            </>
          )}
        </div>
      </div>
      {
        <ConfirmModal
          open={confirmCancel}
          onCancel={() => setConfirmCancel(false)}
          title="Are you sure?"
          message="Confirm to cancel this tour"
          onOk={handleCancelOrder}
          okText="Yes"
          cancelText="No"
        />
      }
    </div>
  ) : (
    <></>
  )
}

export default MyTripDetail
