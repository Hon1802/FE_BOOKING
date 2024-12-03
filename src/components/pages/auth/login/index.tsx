"use client"
import Modal from "@/components/common/modal"
import Register from "@/components/pages/auth/register"
import ForgotPassword from "@/components/pages/auth/forgot-password"
import { useState } from "react"
import { saveToLocalStorage, getFromLocalStorage } from "@/helpers/base.helper"
import { useEffect } from "react"
import { useAuth } from "@/stores/auth"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { passwordPattern } from "@/constants/base.constant"
import InputBorder from "@/components/common/input-border"
import { encrypt, decrypt, parseHexString } from "@/utilities/crypTo"
import Loading from "@/components/common/loading-background"
import { JWT_CONFIG } from "@/constants/base.constant"
import { notifyError, notifySuccess } from "@/helpers/toast.helper"

interface Props {
  isOpen: boolean
  setOpenModal: (value: boolean) => void
}

const Login = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenForgot, setIsOpenForgot] = useState(false)
  const [, actionAuth] = useAuth()
  const [remember, setRemember] = useState(getFromLocalStorage(JWT_CONFIG.storageUserRemember) ? true : false)
  const [loading, setLoading] = useState(false)

  const schemaLogin = yup.object().shape({
    email: yup.string().email("Email is invalid").required("Please enter your email"),
    password: yup.string().required("Please enter password").matches(passwordPattern, "Minimum 8 characters, at least 1 letter, 1 number and 1 special character")
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors
  } = useForm({ resolver: yupResolver(schemaLogin) })

  const submitLogin = async (data: any) => {
    const { email, password } = data

    setLoading(true)

    const result = await actionAuth.loginAsync({ email, password })

    setLoading(false)

    try {
      if (result?.errCode === 200) {
        if (result?.userInfo?.role === "user") {
          if (remember) {
            const emailCipher = encrypt(data.email)
            const passwordCipher = encrypt(data.password)
            saveToLocalStorage(
              JWT_CONFIG.storageUserRemember,
              JSON.stringify({
                email: emailCipher,
                password: passwordCipher
              })
            )
          } else {
            localStorage.removeItem(JWT_CONFIG.storageUserRemember)
          }
          props.setOpenModal(false)
        }
      }
    } catch (e: any) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (getFromLocalStorage(JWT_CONFIG.storageUserRemember)) {
      setValue(
        "email",
        decrypt(
          parseHexString(JSON.parse(getFromLocalStorage(JWT_CONFIG.storageUserRemember)).email.split("@")[0]),
          JSON.parse(getFromLocalStorage(JWT_CONFIG.storageUserRemember)).email.split("@")[1]
        )
      )
      setValue(
        "password",
        decrypt(
          parseHexString(JSON.parse(getFromLocalStorage(JWT_CONFIG.storageUserRemember)).password.split("@")[0]),
          JSON.parse(getFromLocalStorage(JWT_CONFIG.storageUserRemember)).password.split("@")[1]
        )
      )
    }
  }, [])

  return (
    <>
      {loading && <Loading />}
      <Modal open={props.isOpen} onCancel={() => props.setOpenModal(false)} width={500}>
        <form onSubmit={handleSubmit(submitLogin)}>
          <div className="font-bold text-[30px] text-center">Sign in</div>
          <div className="text-[20px] text-center">Sign in for more features!</div>
          <div className="flex flex-col gap-3">
            <div>
              <div className="text-[20px] font-bold">Email</div>
              <InputBorder
                classNameInput="border-[1px] border-[#000] px-3 py-2 rounded-[8px] w-full"
                register={register("email")}
                name="email"
                type="email"
                placeholder={"Enter your email"}
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
            <div className="flex justify-between">
              <div className="flex items-center gap-2 text-[16px]" onClick={() => setRemember(!remember)}>
                <input type="checkbox" className="h-[20px] w-[20px]" checked={remember} />
                Remember me
              </div>
              <div
                onClick={() => {
                  setIsOpenForgot(true), props.setOpenModal(false)
                }}
                className="text-[13px] text-[#166699] cursor-pointer hover:underline"
              >
                Forgot password?
              </div>
            </div>
            <button type="submit" className="mt-2 font-bold text-[20px] py-2 w-full bg-[#166699] text-center text-white cursor-pointer rounded-[8px]">
              Login
            </button>
            <div className="text-center">
              Don't have an account?{" "}
              <span
                onClick={() => {
                  setIsOpen(true), props.setOpenModal(false)
                }}
                className="text-[#166699] cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </div>
          </div>
        </form>
      </Modal>
      <Register isOpen={isOpen} setOpenModal={setIsOpen} setOpenLoginModal={props.setOpenModal} />
      <ForgotPassword isOpen={isOpenForgot} setOpenModal={setIsOpenForgot} setOpenLoginModal={props.setOpenModal} />
    </>
  )
}

export default Login
