import API from "@/configs/api/repository-api"
import { IReqBooking, IReqPayment } from "./booking.interface"

export const createBookingService = (payload: IReqBooking): Promise<any> => {
  return API.post(`/bookings`, {
    body: { ...payload }
  }) as any
}

export const paymentService = (payload: IReqPayment): Promise<any> => {
  return API.post(`/payment`, {
    body: { ...payload }
  }) as any
}

export const getOrdersService = (params?: any): Promise<any> => {
  return API.get(`/bookings`, { ...params }) as any
}

export const getOrderDetailService = (bookingId: string): Promise<any> => {
  return API.get(`/bookings/detail`, { bookingId }) as any
}

export const cancelOrderService = (payload: any): Promise<any> => {
  return API.put(`/bookings/status`, { body: { ...payload } }) as any
}
