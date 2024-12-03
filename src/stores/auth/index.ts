import { loginAsync, registerAsync, logoutAsync, setUser, changePassword, setOpenLogin } from "./auth.action"
import { createHook, createStore } from "react-sweet-state"
import { selector } from "./auth.selector"
import { USER_MODEL } from "@/models/user.model"

export type State = {
  userData: USER_MODEL
  isLogin: boolean
  isRegister: boolean
  isModalLogin: boolean
}

const initialState: State = {
  userData: {
    id: "",
    name: "",
    email: "",
    role: "",
    phone: "",
    birthday: "",
    gender: "",
    address: "",
    urlAvatar: ""
  },
  isLogin: false,
  isRegister: false,
  isModalLogin: false
}

const actions = {
  logoutAsync,
  loginAsync,
  registerAsync,
  setUser,
  changePassword,
  setOpenLogin
}

const Store = createStore({
  initialState,
  actions
})

export const useAuth = createHook(Store, { selector: selector })
