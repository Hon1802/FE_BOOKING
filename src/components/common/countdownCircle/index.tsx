import React, { useRef, useState } from "react"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import styles from "./styles.module.scss"
import { notifyError, notifySuccess } from "@/helpers/toast.helper"

const timerProps = {
  isPlaying: true,
  size: 32,
  strokeWidth: 3
}

function CountdownCircle({ setIsDisabled, sendMail, setIsSend, className, disabled }: { setIsDisabled?: any; disabled?: boolean; className: string; sendMail: any; setIsSend: any }) {
  const [show, setShow] = useState("send")
  const [loading, setLoading] = useState(false)

  const successFunc = (message: string) => {
    setShow("pending")
    notifySuccess(message)
    setIsSend(true)
    setIsDisabled(true)
  }

  const errorFunc = (message: string) => {
    setShow("resend")
    notifyError(message)
    setIsDisabled(false)
  }

  const handleSend = () => {
    if (loading || disabled) return
    sendMail(setLoading, successFunc, errorFunc)
  }

  const RenderTime = ({ remainingTime }: any) => {
    const currentTime = useRef(remainingTime)
    const prevTime = useRef(null)
    const isNewTimeFirstTick = useRef(false)
    const [, setOneLastRerender] = useState(0)

    if (currentTime.current !== remainingTime) {
      isNewTimeFirstTick.current = true
      prevTime.current = currentTime.current
      currentTime.current = remainingTime
    } else {
      isNewTimeFirstTick.current = false
    }

    if (remainingTime === 0) {
      setTimeout(() => {
        setOneLastRerender((val) => val + 1)
      }, 20)
    }

    const isTimeUp = isNewTimeFirstTick.current

    return (
      <div className={styles["time-wrapper"]}>
        <div key={remainingTime} className={`${styles["time"]} ${isTimeUp ? styles["up"] : ""}`}>
          {remainingTime}
        </div>
      </div>
    )
  }

  return (
    <>
      {show === "pending" ? (
        <CountdownCircleTimer
          {...timerProps}
          duration={60}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 6, 3, 0]}
          onComplete={() => {
            setIsDisabled(false)
            setShow("resend")
          }}
        >
          {RenderTime}
        </CountdownCircleTimer>
      ) : show === "send" ? (
        <div onClick={handleSend} className={`${className} text-[13px] font-bold`}>
          Get code
        </div>
      ) : (
        <div onClick={handleSend} className={`${className} text-[13px] font-bold`}>
          Resend
        </div>
      )}
    </>
  )
}

export default CountdownCircle
