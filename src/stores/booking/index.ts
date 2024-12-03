import { createHook, createStore } from "react-sweet-state"
import { setBookingData, createBooking, payment, getOrders, getOrderDetail, cancelOrder } from "./booking.action"

export type State = {
  detail: any
  list: any
  total: number
}

const initialState: State = {
  detail: {
    childNumber: 0,
    adultNumber: 0,
    totalPrice: 0,
    adults: [],
    children: [],
    fullName: "",
    phone: ""
  },
  list: [],
  total: 0
}

const actions = {
  setBookingData,
  createBooking,
  payment,
  getOrders,
  getOrderDetail,
  cancelOrder
}

const Store = createStore({
  initialState,
  actions
})

export const useBooking = createHook(Store)
