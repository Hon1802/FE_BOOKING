import API from "@/configs/api/repository-api"
import { IReqUpdateProfile, IReqVerifyMail } from "./user.interface"

export const getUserByIdService = (id: string): Promise<any> => {
  return API.get(`/get-user-by-id`, { id }) as any
}

export const updateProfileService = (payload: IReqUpdateProfile): Promise<any> => {
  return API.put(`/update-user-by-id`, { body: { ...payload } }) as any
}

export const uploadAvatarService = (payload: any): Promise<any> => {
  return API.patch(`/upload-avatar`, { body: payload }) as any
}

export const sendMailOTP = (payload: IReqVerifyMail): Promise<any> => {
  return API.post(`/common/verification-email`, {
    body: { ...payload }
  }) as any
}
