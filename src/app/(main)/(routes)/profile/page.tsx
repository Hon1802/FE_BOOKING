"use client"
import { useState, useEffect, memo } from "react"
import Flatpickr from "react-flatpickr"
import { yupResolver } from "@hookform/resolvers/yup"
import { VscTriangleDown } from "react-icons/vsc"
import Image from "next/image"
import "flatpickr/dist/flatpickr.css"
import ForgotPasswordModal from "@/components/pages/profile/resetPasswordModal"
import VerifyEmailModal from "@/components/pages/profile/verifyEmailModal"
import { useUser } from "@/stores/users"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import ErrorText from "@/components/common/error-text"
import { USER_MODEL } from "@/models/user.model"
import { getUserByIdService } from "@/services/users"
import { renderTimeCallAPI, convertDateDefaultV3 } from "@/utilities/ConvertDate"
import { notifyError, notifySuccess } from "@/helpers/toast.helper"
import { phonePattern } from "@/constants/base.constant"
import { useRouter } from "next/navigation"
import { useLogin } from "@/hooks/useLogin"
import { styled } from "@mui/material/styles"
import { convertToBase64, base64ToFile } from "@/utilities/Utils"
import { FaXmark, FaCheck } from "react-icons/fa6"
import { sendMailOTP, checkOTP } from "@/services/auth"
import Loading from "@/components/common/loading-background"

const ProfilePicture = styled("img")(({ theme }) => ({
  maxWidth: "100%",
  width: "150px",
  height: "150px",
  position: "relative",
  zIndex: "1",
  borderRadius: "100rem",
  objectFit: "cover",
  objectPosition: "center",
  border: "2px solid var(--main)",
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(4),
    margin: "0"
  }
}))

const Profile = () => {
  const isSpecial = useLogin()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenVerify, setIsOpenVerify] = useState(false)
  const [editField, setEditField] = useState<any>({})
  const [, actionsAccount] = useUser()
  const [profile, setProfile] = useState({} as USER_MODEL)
  const [birthday, setBirthday] = useState("")
  const schema = yup.object().shape({
    email: yup.string().email("Email invalid"),
    name: yup.string().required("Please enter your full name"),
    address: yup.string().required("Please enter your address"),
    phone: yup.string(),
    gender: yup.string().required("Please select your gender")
  })
  const [verifyCode, setVerifyCode] = useState<string>("")
  const [avatar, setAvatar] = useState<string>("")
  const [editAvatar, setEditAvatar] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors },
    clearErrors
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      gender: ""
    }
  })

  useEffect(() => {
    apiGetProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset])

  const apiGetProfile = async () => {
    try {
      const result = await getUserByIdService(JSON.parse(localStorage.getItem("userData") as string)?.id || "")
      if (result.errCode === 200) {
        setValue("gender", result.userInfo?.gender)
        setValue("name", result.userInfo?.name)
        setValue("address", result.userInfo?.address)
        setValue("phone", result.userInfo?.phone)
        setBirthday(convertDateDefaultV3(result.userInfo?.dateOfBirth))
        setProfile(result.userInfo)
        setAvatar(result.userInfo?.urlAvatar)
      }
    } catch {}
  }

  const hideEmail = (email: string) => {
    return email?.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, "$1*****@$2")
  }

  const handleSaveChanges = (data: any) => {
    if (editField["email"] && getValues("email")) {
      setIsOpenVerify(true)
      return
    }
    apiUpdateProfile(
      data,
      () => {
        notifySuccess("Update profile successfully")
        setEditField({})
        apiGetProfile()
      },
      (err: any) => {
        notifyError(err || "Update profile failed")
      }
    )
  }

  const apiUpdateProfile = (data: any, handleSuccess: () => void, handleError: (err: any) => void) => {
    if (editField["email"] && !getValues("email")) {
      setError("email", { type: "manual", message: "Please enter your email" })
      return
    }
    const date = birthday.split("/")

    const newData = {
      ...data,
      fullName: getValues("name"),
      birthday: date[0] + "-" + date[1] + "-" + date[2],
      id: profile?.id,
      email: getValues("email") ? getValues("email") : profile?.email
    }

    if (newData && Object.keys(newData).length > 0) {
      actionsAccount.updateProfile(newData, handleSuccess, (err) => handleError(err))
    } else {
      setEditField({})
    }
  }

  const handleUpdateEmail = async (verificationCode: string, handleSuccess: () => void, handleError: () => void) => {
    const date = birthday.split("/")
    const newData = {
      ...getValues(),
      fullName: getValues("name"),
      id: profile?.id,
      birthday: date[0] + "-" + date[1] + "-" + date[2]
    }
    setLoading(true)

    await checkOTP({
      email: profile?.email as string,
      code: verificationCode
    })
      .then(async (res) => {
        if (res?.errCode === 200) {
          setLoading(false)
          apiUpdateProfile(
            newData,
            () => {
              handleSuccess(), setEditField({}), apiGetProfile(), reset({ ...getValues(), email: "" })
            },
            handleError
          )
        } else notifyError("Wrong verification code")
      })
      .catch(() => {
        setLoading(false)
        notifyError("Server error")
      })
  }

  const handleShowEditBox = (name: string) => {
    const field = { ...editField }
    if (field[name] === true) {
      delete field[name]
    } else {
      field[name] = true
    }
    switch (name) {
      case "name":
      case "email":
      case "address":
      case "phone":
        if (getValues(name) === "") {
          setValue(name, profile?.[name] as string)
          clearErrors(name)
        }
        break
    }
    setEditField(field)
  }

  const handleSelectAvatar = async (e: any) => {
    const file = e.target.files[0]
    const result = (await convertToBase64(file)) as string
    setAvatar(result)
    setEditAvatar(true)
  }

  const submitAvatar = () => {
    if (avatar.split(",")[1] === undefined) return setEditAvatar(false)

    const avatarFile = base64ToFile(avatar?.split(",")[1], "avatar.jpg", "image/jpg")
    setLoading(true)
    if (avatarFile) {
      actionsAccount.uploadAvatar(avatarFile, JSON.parse(localStorage.getItem("userData") as string)?.id).then((res) => {
        if (res?.userInfo) {
          setLoading(false)
          apiGetProfile()
          notifySuccess("Upload avatar successfully")
          setEditAvatar(false)
        } else notifyError("Upload avatar failed")
      })
    }
  }

  return isSpecial ? (
    <>
      {loading && <Loading />}
      <div className="container px-2.5 py-[24px] rounded-[8px] min-h-[300px] mt-[140px] flex-1">
        <form onSubmit={handleSubmit(handleSaveChanges)} className="flex flex-col h-full justify-between">
          <div className="group mb-5 rounded-[100rem] shrink-0 w-full flex justify-center items-center ">
            <div className="relative w-[150px] h-[150px]">
              <ProfilePicture src={avatar || "/defaultAvatar.png"} alt="profile-picture" />
              {editAvatar ? (
                <div className="flex gap-2 absolute right-0 bottom-0 transform translate-x-[0%] z-[9] max-xmd:translate-x-0 max-xmd:translate-y-0">
                  <div
                    onClick={() => {
                      setEditAvatar(false)
                    }}
                    className="w-[2rem] h-[2rem] cursor-pointer shadow-md bg-[white] rounded-[100rem] flex items-center justify-center cursor-pointer"
                  >
                    <FaXmark color="#ff0e0e" />
                  </div>
                  <div className="w-[2rem] h-[2rem] cursor-pointer shadow-md bg-[white] rounded-[100rem] flex items-center justify-center cursor-pointer">
                    <label htmlFor="avatar" className="cursor-pointer" onClick={submitAvatar}>
                      <FaCheck color="#4BB543" />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="w-[2rem] h-[2rem] cursor-pointer shadow-md bg-[white] rounded-[100rem] flex items-center justify-center absolute cursor-pointer right-0 bottom-0 transform translate-x-[0%] z-[9] max-xmd:translate-x-0 max-xmd:translate-y-0">
                  <label htmlFor="avatar" className="cursor-pointer">
                    <Image src={"/icons/ic-edit.svg"} alt="edit" width={20} height={20} />
                  </label>
                  <input id="avatar" type="file" onChange={handleSelectAvatar} className="hidden" accept="image/*" />
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-[20px] md:gap-[40px]  lg:grid-cols-3 md:grid-cols-2 lg:gap-[70px] mb-[40px] lg:mb-[70px]">
            <div className="flex flex-col gap-2 md:gap-5">
              <div className="flex items-center justify-between gap-2">
                <div className="font-[500] text-[18px]">{"Full name"}</div>
                <div
                  onClick={() => {
                    handleShowEditBox("name")
                  }}
                  className="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-[#16447F] bg-opacity-5 text-[16px] cursor-pointer"
                >
                  <Image width={16} height={16} src={editField["name"] ? "/icons/ic-close-edit.svg" : "/icons/ic-edit.svg"} alt="edit" />
                </div>
              </div>
              {editField["name"] ? (
                <>
                  <div className="relative">
                    <input
                      {...register("name")}
                      type="text"
                      name="name"
                      defaultValue={getValues("name") || ""}
                      placeholder={"Please enter full name"}
                      onChange={(e: any) => {
                        const value = e.target.value
                        clearErrors("name")
                        setValue("name", value)
                      }}
                      className="placeholder-gray-500 outline-none pr-10 border border-[#000000] rounded-[10px] p-[10px] w-full bg-transparent"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
                      {getValues("name") && <Image onClick={() => reset({ ...getValues(), name: "" })} src={"/icons/ic-cancel.svg"} alt="edit" width={24} height={24} />}
                    </div>
                  </div>
                  {errors["name"] && <ErrorText>{errors["name"].message}</ErrorText>}
                </>
              ) : profile?.name ? (
                <div className="text-[16px] border border-[#000000] rounded-[10px] p-[10px] w-full bg-transparent">{profile?.name}</div>
              ) : (
                <div className="text-gray-500 text-[16px]"> {"Please enter full name"}</div>
              )}
            </div>
            <div className="flex flex-col gap-2 md:gap-5">
              <div className="flex items-center justify-between gap-2">
                <div className="font-[500] text-[18px]">Email</div>
                <div
                  onClick={() => {
                    handleShowEditBox("email")
                  }}
                  className="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-[#16447F] bg-opacity-5 text-[16px] cursor-pointer"
                >
                  <Image width={16} height={16} src={editField["email"] ? "/icons/ic-close-edit.svg" : "/icons/ic-edit.svg"} alt="edit" />
                </div>
              </div>
              {editField["email"] ? (
                <>
                  <div className="relative">
                    <input
                      {...register("email")}
                      type="email"
                      placeholder={"Please enter email"}
                      name="email"
                      defaultValue={""}
                      onChange={(e: any) => {
                        const value = e.target.value
                        clearErrors("email")
                        setValue("email", value)
                      }}
                      className="placeholder-gray-500 outline-none pr-10 border border-[#000000] rounded-[10px] p-[10px] w-full bg-transparent"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
                      {getValues("email") && <Image onClick={() => reset({ ...getValues(), email: "" })} src={"/icons/ic-cancel.svg"} alt="edit" width={24} height={24} />}
                    </div>
                  </div>
                  {errors["email"] && <ErrorText>{errors["email"].message}</ErrorText>}
                </>
              ) : profile?.email ? (
                <div className="text-[16px] border border-[#000000] rounded-[10px] p-[10px] w-full bg-transparent">{hideEmail(profile?.email)}</div>
              ) : (
                <div className="text-gray-500 text-[16px]">Please enter email</div>
              )}
            </div>
            <div className="flex flex-col gap-2 md:gap-5">
              <div className="flex items-center justify-between gap-2">
                <div className="font-[500] text-[18px]">Phone number</div>
                <div
                  onClick={() => {
                    handleShowEditBox("phone")
                  }}
                  className="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-[#16447F] bg-opacity-5 text-[16px] cursor-pointer"
                >
                  <Image width={16} height={16} src={editField["phone"] ? "/icons/ic-close-edit.svg" : "/icons/ic-edit.svg"} alt="edit" />
                </div>
              </div>
              {editField["phone"] ? (
                <>
                  <div className="relative">
                    <input
                      {...register("phone")}
                      type="text"
                      name="phone"
                      defaultValue={getValues("phone") || ""}
                      placeholder={"Please enter phone number"}
                      onChange={(e: any) => {
                        const value = e.target.value
                        clearErrors("phone")
                        setValue("phone", value)
                      }}
                      className="placeholder-gray-500 outline-none pr-10 border border-[#000000] rounded-[10px] p-[10px] w-full bg-transparent"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
                      {editField["phone"] && (
                        <Image
                          onClick={() => {
                            reset((formValues: any) => ({
                              ...formValues,
                              phone: ""
                            }))
                          }}
                          src={"/icons/ic-cancel.svg"}
                          alt="edit"
                          width={24}
                          height={24}
                        />
                      )}
                    </div>
                  </div>
                  {errors["phone"] && <ErrorText>{errors["phone"].message}</ErrorText>}
                </>
              ) : profile?.phone ? (
                <div className="text-[16px] border border-[#000000] rounded-[10px] p-[10px] w-full bg-transparent">{profile?.phone}</div>
              ) : (
                <div className="text-gray-500 text-[16px]">Please enter phone number</div>
              )}
            </div>
            <div className="flex flex-col gap-2 md:gap-5">
              <div className="flex items-center gap-2">
                <div className="font-[500] text-[18px]">Date of birth</div>
              </div>
              <div className="relative">
                <Flatpickr
                  name="birthday"
                  options={{
                    disableMobile: true,
                    dateFormat: "d/m/Y",
                    maxDate: "today"
                  }}
                  value={birthday || ""}
                  onChange={(_: any, date: string) => {
                    setBirthday(date)
                    setEditField({ ...editField, birthday: true })
                  }}
                  id="release"
                  className={"w-full relative focus:outline-none cursor-pointer bg-transparent text-[16px] border border-[#000000] rounded-[10px] p-[10px]"}
                />
                <div className="absolute inset-y-0 right-[10px] flex items-center pointer-events-none">
                  <VscTriangleDown className="text-gray-500" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 md:gap-5">
              <div className="flex items-center justify-between gap-2">
                <div className="font-[500] text-[18px]">Address</div>
                <div
                  onClick={() => {
                    handleShowEditBox("address")
                  }}
                  className="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-[#16447F] bg-opacity-5 text-[16px] cursor-pointer"
                >
                  <Image width={16} height={16} src={editField["address"] ? "/icons/ic-close-edit.svg" : "/icons/ic-edit.svg"} alt="edit" />
                </div>
              </div>
              {editField["address"] ? (
                <>
                  <div className="relative">
                    <input
                      {...register("address")}
                      type="text"
                      name="address"
                      defaultValue={getValues("address") || ""}
                      placeholder={"Please enter address"}
                      onChange={(e: any) => {
                        const value = e.target.value
                        clearErrors("address")
                        setValue("address", value)
                      }}
                      className="placeholder-gray-500 outline-none pr-10 border border-[#000000] rounded-[10px] p-[10px] w-full bg-transparent"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
                      {getValues("address") && <Image onClick={() => reset({ ...getValues(), address: "" })} src={"/icons/ic-cancel.svg"} alt="edit" width={24} height={24} />}
                    </div>
                  </div>
                  {errors["address"] && <ErrorText>{errors["address"].message}</ErrorText>}
                </>
              ) : profile?.address ? (
                <div className="text-[16px] border border-[#000000] rounded-[10px] p-[10px] w-full bg-transparent">{profile?.address}</div>
              ) : (
                <div className="text-gray-500 text-[16px]"> {"Please enter address"}</div>
              )}
            </div>
            <div className="flex flex-col gap-2 md:gap-5">
              <div className="flex items-center gap-2">
                <div className="font-[500] text-[18px]">Gender</div>
              </div>
              <div className="flex gap-4 text-[20px] h-[46px] px-[10px]">
                <div className="inline-flex items-center gap-2">
                  <label className="relative flex items-center rounded-full cursor-pointer">
                    <input
                      {...register("gender")}
                      type="radio"
                      name="gender"
                      value="male"
                      id="male"
                      onChange={(e) => {
                        setValue("gender", e.currentTarget.id)
                        if (profile?.gender !== "male") setEditField({ ...editField, gender: true })
                        else setEditField({ ...editField, gender: false })
                      }}
                      checked={getValues("gender") === "male"}
                      className="before:content[''] peer relative h-4 w-4 cursor-pointer 
                                              appearance-none rounded-full border-[black] border-[2px] before:opacity-0 before:transition-opacity 
                                              checked:border-[#16447F]"
                    />
                    <span className="absolute text-[#16447F] transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" viewBox="0 0 16 16" fill="currentColor">
                        <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                      </svg>
                    </span>
                  </label>
                  <label htmlFor="male" className="cursor-pointer text-[16px]">
                    Male
                  </label>
                </div>
                <div className="inline-flex items-center gap-2">
                  <label className="relative flex items-center rounded-full cursor-pointer">
                    <input
                      {...register("gender")}
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      onChange={(e) => {
                        setValue("gender", e.currentTarget.id)
                        if (profile?.gender !== "female") setEditField({ ...editField, gender: true })
                        else setEditField({ ...editField, gender: false })
                      }}
                      checked={getValues("gender") === "female"}
                      className="before:content[''] peer relative h-4 w-4 cursor-pointer 
                    appearance-none rounded-full border-[black] border-[2px] before:opacity-0 before:transition-opacity 
                    checked:border-[#16447F]"
                    />
                    <span className="absolute text-[#16447F] transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" viewBox="0 0 16 16" fill="currentColor">
                        <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                      </svg>
                    </span>
                  </label>
                  <label htmlFor="female" className="cursor-pointer text-[16px]">
                    Female
                  </label>
                </div>
                <div className="inline-flex items-center gap-2">
                  <label className="relative flex items-center rounded-full cursor-pointer">
                    <input
                      {...register("gender")}
                      type="radio"
                      name="gender"
                      id="other"
                      value="other"
                      onChange={(e) => {
                        setValue("gender", e.currentTarget.id)
                        if (profile?.gender !== "other") setEditField({ ...editField, gender: true })
                        else setEditField({ ...editField, gender: false })
                      }}
                      checked={getValues("gender") === "other"}
                      className="before:content[''] peer relative h-4 w-4 cursor-pointer 
                    appearance-none rounded-full border-[black] border-[2px] before:opacity-0 before:transition-opacity 
                    checked:border-[#16447F]"
                    />
                    <span className="absolute text-[#16447F] transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" viewBox="0 0 16 16" fill="currentColor">
                        <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                      </svg>
                    </span>
                  </label>
                  <label htmlFor="other" className="cursor-pointer text-[16px]">
                    Other
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end w-full gap-[20px] flex-wrap max-md:flex-col">
            <button
              type="submit"
              disabled={
                editField["phone"] || editField["name"] || editField["email"] || editField["address"] || editField["birthday"] || editField["gender"] || editField["noChange"]
                  ? false
                  : true
              }
              className={`${
                !(editField["phone"] || editField["name"] || editField["email"] || editField["address"] || editField["birthday"] || editField["gender"] || editField["noChange"])
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer "
              } text-[18px] rounded-[4px] bg-transparent 
              w-[320px] h-[40px] text-black border border-[#050226] items-center flex justify-center max-md:w-full`}
            >
              Save changes
            </button>
            <div
              onClick={() => setIsOpen(true)}
              className="max-md:w-full text-[18px] cursor-pointer rounded-[4px] bg-[#004aad] w-[320px] h-[40px] text-[white] items-center flex justify-center"
            >
              Reset password
            </div>
          </div>
        </form>
        <ForgotPasswordModal isOpen={isOpen} setOpenModal={setIsOpen} />
        <VerifyEmailModal
          isOpen={isOpenVerify}
          setOpenModal={setIsOpenVerify}
          email={getValues("email")}
          verifyCode={verifyCode}
          handleUpdateEmail={handleUpdateEmail}
          setVerifyCode={setVerifyCode}
          profile={profile}
        />
      </div>
    </>
  ) : (
    <></>
  )
}
export default memo(Profile)
