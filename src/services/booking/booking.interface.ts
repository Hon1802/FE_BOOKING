export interface IReqBooking {
  tourId: string
  userId: string
  email: string
  phone: string
  information: {
    fullName: string
    email: string
    phone: string
    adults: Array<{ firstName: string; lastName: string }>
    children?: Array<{ firstName: string; lastName: string }>
  }
}

export interface IReqPayment {
  bookingId: string
  payment_method: string
  depositAmount: string
  totalAmount: number
  paymentAccount: string
  status: string
  payerName: string
}
