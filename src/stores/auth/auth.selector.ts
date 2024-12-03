import { State } from "./index"
export const selector = (state: State) => {
  return {
    isLogin: state.isLogin,
    isRegister: state.isRegister,
    userData: state.userData,
    isModalLogin: state.isModalLogin
  }
}
