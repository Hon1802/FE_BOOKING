import Modal from "@/components/common/modal"
import { sendMailForgotPassword } from "@/services/auth"
import { useState } from "react"
import InputBorder from "@/components/common/input-border"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { notifyError, notifySuccess } from "@/helpers/toast.helper"

interface Props {
  isOpen: boolean
  setOpenModal: (value: boolean) => void
  setOpenLoginModal: (value: boolean) => void
}

const ForgotPassword = (props: Props) => {
  const schema = yup.object().shape({
    email: yup.string().email("Email is invalid").required("Please enter your email")
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data: any) => {
    const result = await sendMailForgotPassword({ email: data.email })
    if (result?.errCode === 200) {
      notifySuccess("A mail has been sent to your email")
    } else {
      notifyError("Something wrong")
    }
  }

  return (
    <Modal open={props.isOpen} onCancel={() => props.setOpenModal(false)} width={500}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="font-bold text-[30px] text-center">Forgot password</div>
        <div className="text-[20px] text-center">We will send an email to reset your password!</div>
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
        <button type="submit" className="mt-4 font-bold text-[20px] py-2 w-full bg-[#166699] text-center text-white cursor-pointer rounded-[8px]">
          Reset password
        </button>
        <div className="text-center mt-1">
          Back to{" "}
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
  )
}

export default ForgotPassword
