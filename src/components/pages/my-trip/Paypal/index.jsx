import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { useEffect } from "react"
import { useBooking } from "@/stores/booking"
import { notifyError, notifySuccess } from "@/helpers/toast.helper"
import { useParams } from "next/navigation"
import { naiveRound } from "@/helpers/base.helper"

const style = { layout: "vertical" }
const ButtonWrapper = ({ currency, showSpinner, amount }) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer()
  const [store, action] = useBooking()
  const { id } = useParams()

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency
      }
    })
  }, [currency, showSpinner])

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style, currency, amount]}
        fundingSource={"paypal"}
        createOrder={(data, actions) =>
          actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: naiveRound(amount / 25000, 2)
                  }
                }
              ]
            })
            .then((orderId) => orderId)
        }
        onApprove={(data, actions) => {
          actions.order.capture().then(async (response) => {
            if (response.status === "COMPLETED") {
              action.payment(
                {
                  bookingId: id,
                  payment_method: "e-wallet",
                  depositAmount: store.detail.totalPrice,
                  totalAmount: store.detail.totalPrice,
                  paymentAccount: response?.payer?.email_address,
                  status: "COMPLETED",
                  payerName: response?.payer?.name?.given_name + " " + response?.payer?.name?.surname
                },
                () => {
                  notifySuccess("Pay successfully")
                  action.getOrderDetail(id)
                },
                (message) => {
                  notifyError(message)
                }
              )
            }
          })
        }}
        onError={(err) => console.log(err)}
      />
    </>
  )
}

const initialOptions = {
  clientId: "AaKyP5gk7WB5LIEM3XWB12R_KL8KEYejKqKuJs_Dvqb7i5vJF56XpK5QZotvVvuM1e-Ki2Fgz_yzEyyM",
  currency: "USD",
  intent: "capture"
}

const Paypal = ({ amount }) => {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <ButtonWrapper showSpinner={false} currency={"USD"} amount={amount} />
    </PayPalScriptProvider>
  )
}

export default Paypal
