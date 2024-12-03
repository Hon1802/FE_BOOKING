import API from "@/configs/api/repository-api"
import { IReqLogin, IReqRegister, IReqVerifyMail, IReqLogout, IReqResetPassword } from "./auth.interface"

export const loginService = (payload: IReqLogin): Promise<any> => {
  return API.post(`/sign-in`, {
    body: { ...payload }
  }) as any
}

export const logoutService = (payload: IReqLogout): Promise<any> => {
  return API.post(`/log-out`, {
    body: { ...payload }
  }) as any
}

export const registerService = (payload: IReqRegister): Promise<any> => {
  return API.post(`/sign-up`, {
    body: { ...payload }
  }) as any
}

export const sendMailForgotPassword = (payload: IReqVerifyMail): Promise<any> => {
  return API.post(`/forgot-password`, {
    body: { ...payload }
  }) as any
}

export const sendMailOTP = (payload: IReqVerifyMail): Promise<any> => {
  return API.post(`/common/verification-email-exist`, {
    body: { ...payload }
  }) as any
}

export const checkOTP = (payload: IReqVerifyMail): Promise<any> => {
  return API.post(`/common/confirm-otp-email`, {
    body: { ...payload }
  }) as any
}

export const resetPasswordService = (payload: IReqResetPassword): Promise<any> => {
  return API.patch(`/update-password`, {
    body: { ...payload }
  }) as any
}
