export interface IReqLogin {
  email: string
  password: string
}

export interface IReqRegister {
  fullName: string
  address: string
  email: string
  password: string
}

export interface IReqVerifyMail {
  email: string
  code?: string
  password?: string
}

export interface IReqLogout {
  id: string
}

export interface IReqResetPassword {
  id: string
  oldPassword: string
  newPassword: string
}
