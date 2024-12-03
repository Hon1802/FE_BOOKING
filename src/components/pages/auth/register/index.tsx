import Modal from "@/components/common/modal"
import { useState } from "react"
import { useEffect } from "react"
import { useAuth } from "@/stores/auth"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { passwordPattern, emailPattern } from "@/constants/base.constant"
import InputBorder from "@/components/common/input-border"
import Loading from "@/components/common/loading-background"
import { notifyError } from "@/helpers/toast.helper"
import CountdownCircle from "@/components/common/countdownCircle"
import ErrorText from "@/components/common/error-text"
import { sendMailOTP, checkOTP } from "@/services/auth"

interface Props {
  isOpen: boolean
  setOpenModal: (value: boolean) => void
  setOpenLoginModal: (value: boolean) => void
}

const Register = (props: Props) => {
  const [gender, setGender] = useState("male")
  const [loading, setLoading] = useState(false)
  const [, actionAuth] = useAuth()
  const [isSend, setIsSend] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const schemaRegister = yup.object().shape({
    fullName: yup.string().required("Please enter your full name"),
    email: yup.string().email("Email is invalid").required("Please enter your email"),
    address: yup.string().required("Please enter your address"),
    password: yup.string().required("Please enter your password").matches(passwordPattern, "Minimum 8 characters, at least 1 letter, 1 number and 1 special character"),
    confirmPassword: yup
      .string()
      .required("Please enter confirm password")
      .matches(passwordPattern, "Minimum 8 characters, at least 1 letter, 1 number and 1 special character")
      .oneOf([yup.ref("password"), ""], "Confirm password is incorrect"),
    verificationCode: yup.string().required("Please enter verification code").length(6, "Length of 6 characters")
  })

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    clearErrors
  } = useForm({ resolver: yupResolver(schemaRegister) })

  const handleSendMailRegister = async (setLoading: any, successFunc: any, errorFunc: any) => {
    setLoading(true)
    try {
      const result = await sendMailOTP({ email: getValues("email") })
      setLoading(false)
      if (result?.errCode === 200) {
        clearErrors("verificationCode")
        successFunc("Send mail success")
      } else {
        errorFunc(result?.message || "Send failed")
      }
    } catch (error: any) {
      console.log(error)
      errorFunc("Send failed")
      setLoading(false)
    }
  }

  const onSubmit = async (data: any) => {
    if (!gender) return notifyError("Please select gender")

    const { confirmPassword, ...rest } = data

    setLoading(true)

    await checkOTP({
      email: getValues("email"),
      code: getValues("verificationCode")
    })
      .then(async (res) => {
        if (res?.errCode === 200) {
          const result = await actionAuth.registerAsync({ ...rest, gender })
          setLoading(false)
          if (result?.errCode === 200) {
            props.setOpenModal(false)
            props.setOpenLoginModal(true)
            reset()
          }
        } else {
          setLoading(false)
          notifyError("Wrong verification code")
        }
      })
      .catch(() => {
        setLoading(false)
        notifyError("Wrong verification code")
      })
  }

  return (
    <>
      {loading && <Loading />}
      <Modal open={props.isOpen} onCancel={() => props.setOpenModal(false)} width={500}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="font-bold text-[30px] text-center">Sign up your account</div>
          <div className="flex flex-col overflow-y-auto h-[60vh] pr-2">
            <div>
              <div className="text-[20px] font-bold">Full name</div>
              <InputBorder
                classNameInput="border-[1px] border-[#000] px-3 py-2 rounded-[8px] w-full"
                register={register("fullName")}
                name="fullName"
                type="text"
                placeholder={"Enter your full name"}
                errors={errors}
                clearErrors={clearErrors}
                setValue={setValue}
              />
            </div>
            <div>
              <div className="text-[20px] font-bold">Address</div>
              <InputBorder
                classNameInput="border-[1px] border-[#000] px-3 py-2 rounded-[8px] w-full"
                register={register("address")}
                name="address"
                type="text"
                placeholder={"Enter your address"}
                errors={errors}
                clearErrors={clearErrors}
                setValue={setValue}
              />
            </div>
            <div>
              <div className="text-[20px] font-bold">Password</div>
              <InputBorder
                classNameInput="border-[1px] border-[#000] px-3 py-2 rounded-[8px] w-full"
                register={register("password")}
                name="password"
                type="password"
                placeholder={"Enter your password"}
                errors={errors}
                clearErrors={clearErrors}
                setValue={setValue}
              />
            </div>
            <div>
              <div className="text-[20px] font-bold">Confirm password</div>
              <InputBorder
                classNameInput="border-[1px] border-[#000] px-3 py-2 rounded-[8px] w-full"
                register={register("confirmPassword")}
                name="confirmPassword"
                type="password"
                placeholder={"Enter confirm password"}
                errors={errors}
                clearErrors={clearErrors}
                setValue={setValue}
              />
            </div>
            <div>
              <div className="text-[20px] font-bold">Gender</div>
              <div className="flex gap-6">
                <div className="flex gap-3 items-center text-[16px]">
                  <input type="radio" id="gender" checked={gender === "male"} value="male" onChange={() => setGender("male")} className="h-[20px] w-[20px]" />
                  Male
                </div>
                <div className="flex gap-3 items-center text-[16px]">
                  <input type="radio" id="gender" checked={gender === "female"} value="female" onChange={() => setGender("female")} className="h-[20px] w-[20px]" />
                  Female
                </div>
              </div>
            </div>
            <div>
              <div className="text-[20px] font-bold">Email</div>
              <div className="w-full">
                <div className={`relative w-full text-[#9997a6] h-[45px] bg-white rounded-[8px] border-[1px] border-[#000]`}>
                  <input
                    {...register("email")}
                    type={"text"}
                    style={{ paddingRight: `37px !important` }}
                    className={`!pl-[22px] input-border rounded-[8px] text-black ${isDisabled ? "bg-[#e4e4e4] opacity-50" : ""} ${"h-full bg-white"} ${errors["email"] ? "error" : ""}`}
                    placeholder={"Enter email"}
                    onChange={(e: any) => {
                      const value = e.target.value
                      clearErrors("email")
                      setValue("email", value)
                    }}
                  />
                  <div className="absolute top-[50%] transform translate-y-[-50%] right-[5px] flex items-center px-2 text-gray-700">
                    <CountdownCircle
                      setIsDisabled={setIsDisabled}
                      disabled={!(getValues("email") && emailPattern.test(getValues("email")))}
                      className={`${!(getValues("email") && emailPattern.test(getValues("email"))) ? "opacity-20 cursor-not-allowed" : "cursor-pointer"}`}
                      sendMail={handleSendMailRegister}
                      setIsSend={setIsSend}
                    />
                  </div>
                </div>
                <small className="text-[red] w-full opacity-60 word-break">*Using the email of the account to correspond from this system</small>
                {errors["email"] && <ErrorText>{errors["email"].message as string}</ErrorText>}
              </div>
            </div>
            {isSend && (
              <div className="w-full flex-col justify-start items-start gap-2 inline-flex mb-[20px]">
                <div className="text-[20px] font-bold">Verification code</div>
                <div className="w-full">
                  <InputBorder
                    classNameInput="border-[1px] border-[#000] px-3 py-2 rounded-[8px] w-full"
                    register={register("verificationCode")}
                    name="verificationCode"
                    type="text"
                    placeholder={"Enter verification code"}
                    errors={errors}
                    clearErrors={clearErrors}
                    setValue={setValue}
                  />
                </div>
              </div>
            )}
          </div>

          <button type="submit" className="mt-2 font-bold text-[20px] py-2 w-full bg-[#166699] text-center text-white cursor-pointer rounded-[8px]">
            Register
          </button>
          <div className="text-center mt-1">
            Already have an account?{" "}
            <span
              onClick={() => {
                props.setOpenModal(false), props.setOpenLoginModal(true)
              }}
              className="text-[#166699] cursor-pointer hover:underline"
            >
              Sign in
            </span>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default Register
