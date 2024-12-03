import { Modal } from "antd"
import React from "react"
import styled from "styled-components"
import InputBorder from "@/components/common/input-border"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { passwordPattern } from "@/constants/base.constant"
// import { changePassword } from "stores/account/account.action"
import { useAuth } from "@/stores/auth"

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
    font-family: "Roboto", sans-serif;
    font-weight: 700 !important;
    color: #050226;
  }
  .ant-modal-close-x {
    color: black;
    font-size: 20px;
  }
`
const ModalReset = (props: any) => {
  const { isOpen, setOpenModal } = props
  const [checkDisabled, setCheckDisabled] = React.useState<boolean>(false)
  const [, actionAuth] = useAuth()
  const schemaChangePassword = yup.object().shape({
    oldPassword: yup
      .string()
      .required("Please enter old password")
      .matches(passwordPattern, "Password must contain at least 8 characters, at least 1 letter, 1 number and 1 special character"),
    newPassword: yup
      .string()
      .required("Please enter new password")
      .matches(passwordPattern, "Password must contain at least 8 characters, at least 1 letter, 1 number and 1 special character"),
    confirmPassword: yup
      .string()
      .required("Please enter confirm password")
      .matches(passwordPattern, "Password must contain at least 8 characters, at least 1 letter, 1 number and 1 special character")
      .oneOf([yup.ref("newPassword"), ""], "Confirm password is incorrect")
  })
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    clearErrors
  } = useForm({
    resolver: yupResolver(schemaChangePassword)
  })

  const onSubmit = async (data: any) => {
    actionAuth.changePassword(
      { id: JSON.parse(localStorage.getItem("userData") as string)?.id, oldPassword: data.oldPassword, newPassword: data.newPassword },
      () => {
        setOpenModal(false)
        reset({
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
        })
      },
      () => {
        setError("oldPassword", { type: "manual", message: "Old password is incorrect" })
      }
    )
  }
  return (
    <ModalStyled centered open={isOpen} title={"Reset password"} onCancel={() => setOpenModal(false)} okButtonProps={{ style: { display: "none" } }} zIndex={999999}>
      <form className="mt-[30px] md:mt-[10px] font-sans" onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-[white] relative rounded-[8px]">
          <div className="mt-[10px] text-[14px] sm:text-[18px] md:mt-[25px]">
            <p className="text-[#050226] leading-[28px] my-[10px]">Old password</p>
            <InputBorder
              register={register("oldPassword")}
              classNameInput="!p-[10px] border border-[#0f75bc] bg-[white] !rounded-[8px]"
              name="oldPassword"
              type="password"
              errors={errors}
              clearErrors={clearErrors}
              setValue={setValue}
              placeholder={"Input password"}
            />
          </div>
          <div className="md:mt-[25px] mt-[10px] text-[14px] sm:text-[18px] ">
            <p className="text-[#050226] leading-[28px] my-[10px] !rounded-[8px]">New password</p>
            <InputBorder
              classNameInput="!p-[10px] border border-[#0f75bc] bg-[white] !rounded-[8px]"
              name="newPassword"
              register={register("newPassword")}
              type="password"
              errors={errors}
              clearErrors={clearErrors}
              setValue={setValue}
              placeholder={"Input password"}
            />
          </div>
          <div className="md:mt-[25px] mt-[10px] text-[14px] sm:text-[18px] ">
            <p className="text-[#050226] leading-[28px] my-[10px]">Confirm password</p>
            <InputBorder
              register={register("confirmPassword")}
              classNameInput="!p-[10px] border border-[#0f75bc] bg-[white] !rounded-[8px]"
              name="confirmPassword"
              type="password"
              errors={errors}
              clearErrors={clearErrors}
              setValue={setValue}
              placeholder={"Input password"}
            />
          </div>
          <div>
            <input
              type="submit"
              disabled={checkDisabled}
              className="text-[14px] h-[44px] sm:text-[18px] mb-[10px] bg-[#004aad] shadow-lg text-white w-full py-[10px] mt-[18px] rounded-[4px] cursor-pointer"
              value={"Reset password"}
            />
          </div>
        </div>
      </form>
    </ModalStyled>
  )
}
export default ModalReset
