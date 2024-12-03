import React from "react"

interface ErrorTextProps {
  children: React.ReactNode
  classNameError?: string
}

const ErrorText = (props: ErrorTextProps) => {
  const { children, classNameError } = props
  return (
    <div className="flex items-center justify-start gap-x-[10px] pt-[2px] w-full">
      <p className={`text-[13px] text-left font-normal text-[#f43f23] ${classNameError} w-full`} style={{ wordBreak: "break-word" }}>
        {children}
      </p>
    </div>
  )
}

export default ErrorText
