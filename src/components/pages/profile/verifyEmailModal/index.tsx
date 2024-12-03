import { Modal } from "antd"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import InputBorder from "@/components/common/input-border"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { sendMailOTP } from "@/services/users"
import { notifyError, notifySuccess } from "@/helpers/toast.helper"
import CountdownCircle from "@/components/common/countdownCircle"
import ErrorText from "@/components/common/error-text"
import { emailPattern } from "@/constants/base.constant"

const ModalStyled = styled(Modal)`
  padding: 10px;
  .ant-modal-content {
    border-radius: 8px !important;
    padding: 20px;
  }
  .ant-modal-footer {
    display: none;
  }
  .ant-modal-title {
    font-size: 20px;
    width: 80%;
    font-family: "Roboto", sans-serif;
    font-weight: 400 !important;
  }
  .ant-modal-close-x {
    color: black;
    font-size: 20px;
  }
`
const ModalVerifyEmail = (props: any) => {
  const { isOpen, setOpenModal } = props
  const [isSend, setIsSend] = useState(false)
  const [_, setIsDisabled] = useState(false)
  const schema = yup.object().shape({
    code: yup.string().required("Please enter your code"),
    email: yup.string().email("Email is invalid").required("Please enter your email")
  })
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    clearErrors,
    setError
  } = useForm({ resolver: yupResolver(schema) })

  useEffect(() => {
    setValue("email", props.profile.email)
  }, [props.profile.email])

  const handleSendCode = async (setLoading: any, successFunc: any, errorFunc: any) => {
    setLoading(true)
    try {
      const result = await sendMailOTP({ email: props.profile.email })
      setLoading(false)
      if (result?.errCode === 200) {
        successFunc("Send mail success")
      } else {
        setError("email", { type: "manual", message: result?.message })
      }
    } catch (error: any) {
      console.log(error)
      errorFunc("Server error")
      setLoading(false)
    }
  }
  const submitVerifyCode = () => {
    props.handleUpdateEmail(
      getValues("code"),
      () => {
        notifySuccess("Update profile successfully")
        setOpenModal(false)
        reset({ code: "" })
      },
      () => {
        setError("code", { type: "manual", message: "Invalid code" })
      }
    )
  }
  return (
    <ModalStyled centered open={isOpen} title={"We will send code to your email"} onCancel={() => setOpenModal(false)} okButtonProps={{ style: { display: "none" } }} zIndex={999999}>
      <form className="mt-[30px] md:mt-[10px] font-sans" onSubmit={handleSubmit(submitVerifyCode)}>
        <div className="bg-[white] relative rounded-[8px]">
          <div className="mt-[25px] text-[14px] sm:text-[18px]">
            <div className={`relative w-full h-[45px] bg-white bg-opacity-90 rounded-lg border-[2px] border-[#0060FF] border-opacity-10`}>
              <input
                {...register("email")}
                type={"email"}
                disabled
                style={{ paddingRight: `37px !important` }}
                className={`input-border ${"h-full bg-white"} ${errors["email"] ? "error" : ""}`}
                value={props.profile.email}
              />
              <div className="absolute top-[50%] transform translate-y-[-50%] right-[5px] flex items-center px-2 text-gray-700">
                <CountdownCircle
                  disabled={!(props.email && emailPattern.test(props.email))}
                  className={`${!(props.email && emailPattern.test(props.email)) ? "opacity-20 cursor-not-allowed" : "cursor-pointer"}`}
                  sendMail={handleSendCode}
                  setIsSend={setIsSend}
                  setIsDisabled={setIsDisabled}
                />
              </div>
            </div>
            {errors["email"] && <ErrorText>{errors["email"].message as string}</ErrorText>}
          </div>
          <div className="mt-[25px] text-[14px] sm:text-[18px]">
            <InputBorder
              register={register("code")}
              errors={errors}
              clearErrors={clearErrors}
              setValue={setValue}
              classNameInput="!p-[10px] border border-[#0f75bc] bg-[white]"
              name="code"
              type="text"
              placeholder={`6 digits`}
            />
          </div>
          <div>
            <input
              type="submit"
              className="text-[14px] h-[44px] sm:text-[18px] mb-[10px] bg-[#004aad] shadow-lg text-white w-full py-[10px] mt-[18px] rounded-[4px] cursor-pointer"
              value={"Verify code"}
            />
          </div>
        </div>
      </form>
    </ModalStyled>
  )
}
export default ModalVerifyEmail
