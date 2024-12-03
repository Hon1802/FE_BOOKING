import React from "react"
import { UseFormRegisterReturn } from "react-hook-form"
import ErrorText from "../error-text"
import { FiEyeOff, FiEye } from "react-icons/fi"

type Props = {
  register: UseFormRegisterReturn
  name: string
  errors?: any
  autofill?: boolean
  disabled?: boolean
  placeholder?: string
  type?: "password" | "text" | "email" | "number"
  classNameInput?: string
  classNameWrapper?: string
  clearErrors?: (item: any) => void
  setValue?: (key: any, value: unknown) => void
  onKeyPress?: (key: any) => void
}

const InputBorder = ({
  register,
  name,
  type = "text",
  errors = {},
  disabled = false,
  placeholder = "",
  classNameInput = "",
  classNameWrapper = "",
  autofill = true,
  clearErrors = () => {
    return
  },
  onKeyPress = () => {
    return
  },
  setValue = () => {
    return
  }
}: Props) => {
  const [thisType, setThisType] = React.useState(type)
  const [showVisible, setShowVisible] = React.useState(false)
  const changeType = () => setThisType(thisType === "password" ? "text" : "password")

  React.useEffect(() => {
    if (type === "password") {
      setShowVisible(true)
    }
  }, [type])

  const onChange = (e: any) => {
    const value = e.target.value
    clearErrors(name)
    setValue(name, value)
  }

  return (
    <>
      <div className={`relative ${classNameWrapper}`}>
        <input
          {...register}
          type={thisType}
          style={{ paddingRight: `${name === "password" && "37px !important"}` }}
          className={`input-border ${classNameInput} ${errors[name] ? "error" : ""}`}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autofill ? "on" : "new-password"}
        />
        {showVisible && (
          <div className="absolute top-[50%] transform translate-y-[-50%] right-[5px] flex items-center px-2 text-gray-700 cursor-pointer" onClick={changeType}>
            {thisType === "password" ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </div>
        )}
      </div>
      {errors[name] && <ErrorText>{errors[name].message}</ErrorText>}
    </>
  )
}

export default InputBorder
