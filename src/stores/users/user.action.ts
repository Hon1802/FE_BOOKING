import { getUserByIdService, updateProfileService, uploadAvatarService } from "@/services/users"
import { State } from "./index"
import { BaseAction } from ".."
import { notifyError } from "@/helpers/toast.helper"
import { IReqUpdateProfile } from "@/services/users/user.interface"

type Actions = BaseAction<State>

export const getUserById = (tourId: string) => {
  return async (actions: Actions) => {
    try {
      const res = await getUserByIdService(tourId)
      actions.setState({
        ...actions.getState(),
        user: res?.userInfo
      })
    } catch (error: any) {
      actions.setState({
        ...actions.getState(),
        user: {}
      })
    }
  }
}

export const updateProfile =
  (payload: IReqUpdateProfile, handleSuccess: () => void, handleError: (err: any) => void) =>
  async ({ dispatch, getState, setState }: Actions) => {
    try {
      const result = await updateProfileService(payload)
      if (result?.errCode === 200) {
        handleSuccess()
      } else {
        handleError(result?.message)
      }
      return result
    } catch (error: any) {
      const result = error?.response
      notifyError("Server error")
      return result
    }
  }

export const uploadAvatar = (file: any, id: string) => async () => {
  if (!file || typeof file === "string") return file
  const formData = new FormData()
  formData.append("id", id)
  formData.append("image", file)

  return await uploadAvatarService(formData)
}
