export interface IReqUpdateProfile {
  fullName?: string
  phone?: string
  birthday?: string
  email?: string
  gender?: string
  urlAvatar?: string
}

export interface IReqVerifyMail {
  email: string
  code?: string
  password?: string
}
