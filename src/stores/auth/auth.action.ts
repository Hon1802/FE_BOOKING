import { BaseAction } from ".."
import { State } from "./index"
import { notifyError, notifySuccess } from "@/helpers/toast.helper"
import { KEY_COOKIE } from "@/constants/key-cookie.constant"
import { loginService, registerService, logoutService, resetPasswordService } from "@/services/auth"
import { saveToCookie, saveToLocalStorage, removeFromLocalStorage } from "@/helpers/base.helper"
import { IReqLogin, IReqRegister, IReqLogout, IReqResetPassword } from "@/services/auth/auth.interface"

type Actions = BaseAction<State>

//USER
export const setUser =
  (payload: { userData: any; isLogin?: boolean; isRegister?: boolean }) =>
  ({ setState, getState }: Actions) => {
    setState({ ...getState(), ...payload })
  }

export const loginAsync =
  (payload: IReqLogin) =>
  async ({ dispatch, getState, setState }: Actions) => {
    try {
      const result = await loginService(payload)

      if (result.errCode === 200) {
        saveToLocalStorage("token", result?.accessToken)
        saveToLocalStorage("isLogin", true)
        saveToCookie(null, KEY_COOKIE.TOKEN, result?.accessToken, {
          path: "/"
        })
        if (result?.userInfo) {
          if (result?.userInfo?.role === "user") {
            saveToLocalStorage("userData", result?.userInfo)
            dispatch(
              setUser({
                userData: { ...result?.userInfo },
                isLogin: true
              })
            )
            notifySuccess("Login successfully")
          } else {
            notifyError("User not exist")
          }
        }
      } else {
        notifyError(result?.message)
      }

      return result
    } catch (error: any) {
      const result = error?.response
      notifyError("Server error")
      return result
    }
  }

export const registerAsync =
  (payload: IReqRegister) =>
  async ({ dispatch, getState, setState }: Actions) => {
    try {
      const result = await registerService(payload)
      if (result.errCode === 200) {
        notifySuccess("Register successfully")
      } else {
        notifyError(result?.message as any)
      }
      return result
    } catch (error: any) {
      const result = error?.response
      notifyError("Server error")
      return result
    }
  }

export const logoutAsync =
  (payload: IReqLogout): any =>
  async ({ setState, getState }: Actions) => {
    try {
      const result = await logoutService(payload)
      removeFromLocalStorage("token")
      removeFromLocalStorage("userData")
      removeFromLocalStorage("isLogin")
      setState({
        ...getState(),
        isRegister: false,
        isLogin: false,
        userData: {}
      })
      notifySuccess("Logout successfully")

      return result
    } catch (error: any) {
      const result = error?.response
      notifyError("Server error")
      return result
    }
  }

export const changePassword =
  (payload: IReqResetPassword, handleSuccess: () => void, handleError: () => void) =>
  async ({ dispatch, getState, setState }: Actions) => {
    try {
      const result = await resetPasswordService(payload)
      if (result?.errCode === 200) {
        notifySuccess("Reset password successfully" as any)
        handleSuccess()
      } else {
        handleError()
      }
      return result
    } catch (error: any) {
      const result = error?.response
      notifyError("Reset password failed")
      return result
    }
  }

export const setOpenLogin = (value: boolean) => {
  return async (actions: Actions) => {
    actions.setState({
      isModalLogin: value
    })
  }
}
