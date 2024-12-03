import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { useEffect } from "react"
import { useBooking } from "@/stores/booking"
import { notifyError, notifySuccess } from "@/helpers/toast.helper"
import { useUser } from "@/stores/users"
import { useParams } from "next/navigation"
import { naiveRound } from "@/helpers/base.helper"
import { useTours } from "@/stores/tour"

const style = { layout: "vertical" }
const ButtonWrapper = ({ currency, showSpinner, amount, handleSetActiveStep, adultArray, childrenArray }) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer()
  const [store, action] = useBooking()
  const [user] = useUser()
  const { id } = useParams()
  const [storeTour] = useTours()

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
              adultArray = JSON.stringify(adultArray)
              childrenArray = JSON.stringify(childrenArray)
              action.createBooking(
                {
                  userId: user.user.id,
                  tourId: id,
                  information: {
                    fullName: store.detail.fullName,
                    email: store.detail.email,
                    phone: store.detail.phone,
                    adults: store.detail.adults,
                    children: store.detail.childNumber > 0 ? store.detail.children : []
                  }
                },
                (data) => {
                  action.payment(
                    {
                      bookingId: data?.id,
                      payment_method: "e-wallet",
                      depositAmount: amount,
                      totalAmount: store.detail.totalPrice,
                      paymentAccount: response?.payer?.email_address,
                      status: storeTour?.detail?.isApprove ? "COMPLETED" : "DEPOSIT_ADVANCE",
                      payerName: response?.payer?.name?.given_name + " " + response?.payer?.name?.surname
                    },
                    () => {
                      notifySuccess("Booking successfully")
                      history.back()
                    },
                    (message) => {
                      notifyError(message)
                    }
                  )
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

const Paypal = ({ amount, handleSetActiveStep }) => {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <ButtonWrapper showSpinner={false} currency={"USD"} amount={amount} handleSetActiveStep={handleSetActiveStep} />
    </PayPalScriptProvider>
  )
}

export default Paypal
