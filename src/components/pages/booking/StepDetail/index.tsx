import { useUser } from "@/stores/users"
import { IoChevronForwardSharp } from "react-icons/io5"
import { RiErrorWarningLine } from "react-icons/ri"
import { useForm } from "react-hook-form"
import ErrorText from "@/components/common/error-text"
import { useState } from "react"
import { useBooking } from "@/stores/booking"
import { notifyError } from "@/helpers/toast.helper"

const StepDetail = ({ setStep }: any) => {
  const [store] = useUser()
  const [adults, setAdults] = useState<any>([{ firstName: "", lastName: "" }])
  const [children, setChildren] = useState<any>([{ firstName: "", lastName: "" }])
  const [storeBooking, actionBooking] = useBooking()

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
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: ""
    }
  })

  const onSubmit = () => {
    if (adults.slice(0, -1).filter((item: any) => item.firstName === "" || item.lastName === "").length > 0) return notifyError("Please fill in all required fields")
    if (storeBooking.detail.childNumber && children.slice(0, -1).filter((item: any) => item.firstName === "" || item.lastName === "").length > 0)
      return notifyError("Please fill in all required fields")
    actionBooking.setBookingData({ ...storeBooking.detail, adults, children, fullName: getValues("firstName") + " " + getValues("lastName"), phone: getValues("phone") })
    setStep(2)
  }

  const handleChangeAdult = (e: any, name: string, index: number) => {
    const value = e.target.value
    let arr = [...adults]
    if (index === arr.length - 1) arr.push({ firstName: "", lastName: "" })
    arr[index][name] = value
    setAdults(arr)
  }

  const handleChangeChildren = (e: any, name: string, index: number) => {
    const value = e.target.value
    let arr = children
    if (index === arr.length - 1) arr.push({ firstName: "", lastName: "" })
    arr[index][name] = value

    setChildren(arr)
  }

  const renderInput = (handleChange: any, name: string, length: number) => {
    let result = []
    for (let i = 0; i < length; i++) {
      result.push(
        <>
          <div className="text-[16px] font-bold mt-2">
            {name} {i + 1}
          </div>
          <div className="flex justify-between gap-3">
            <div className="w-full">
              <div className="flex items-center gap-2">
                <div className="text-[14px] font-[500]">First name</div> <p className="text-[#D4111E]">*</p>
              </div>
              <input
                onChange={(e: any) => {
                  handleChange(e, "firstName", i)
                }}
                className="mb-2 w-full border-[1px] border-[#000] px-3 py-1 outline-none rounded-[4px] text-[14px] h-[36px]
                        focus:border-[#0057b8] focus:border-[2px]"
              />
            </div>
            <div className="w-full">
              <div className="flex items-center gap-2">
                <div className="text-[14px] font-[500]">Last name</div> <p className="text-[#D4111E]">*</p>
              </div>
              <input
                onChange={(e: any) => {
                  handleChange(e, "lastName", i)
                }}
                className="w-full border-[1px] border-[#1a1a1a] px-3 py-1 outline-none rounded-[4px] text-[14px] h-[36px]
                        focus:border-[#0057b8] focus:border-[2px]"
              />
            </div>
          </div>
        </>
      )
    }
    return result
  }
  return (
    <>
      <div className="max-w-[445px] w-full">
        <div className="text-[20px] font-bold mb-2">Your details</div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full justify-between">
          <div className="flex justify-between gap-3">
            <div className="w-full">
              <div className="flex items-center gap-2">
                <div className="text-[14px] font-[500]">First name</div> <p className="text-[#D4111E]">*</p>
              </div>
              <input
                {...(register("firstName"), { required: true })}
                name="firstName"
                onChange={(e: any) => {
                  const value = e.target.value
                  clearErrors("firstName")
                  setValue("firstName", value)
                }}
                className="w-full border-[1px] border-[#000] px-3 py-1 outline-none rounded-[4px] text-[14px] h-[36px]
                        focus:border-[#0057b8] focus:border-[2px]"
              />
              {errors["firstName"] && <ErrorText>{errors["firstName"].message}</ErrorText>}
            </div>
            <div className="w-full">
              <div className="flex items-center gap-2">
                <div className="text-[14px] font-[500]">Last name</div> <p className="text-[#D4111E]">*</p>
              </div>
              <input
                {...(register("lastName"), { required: true })}
                name="lastName"
                onChange={(e: any) => {
                  const value = e.target.value
                  clearErrors("lastName")
                  setValue("lastName", value)
                }}
                className="w-full border-[1px] border-[#1a1a1a] px-3 py-1 outline-none rounded-[4px] text-[14px] h-[36px]
                        focus:border-[#0057b8] focus:border-[2px]"
              />
            </div>
            {errors["lastName"] && <ErrorText>{errors["lastName"].message}</ErrorText>}
          </div>
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <div className="text-[14px] font-[500]">Email address</div> <p className="text-[#D4111E]">*</p>
            </div>
            <input
              className="w-full border-[1px] border-[#1a1a1a] px-3 py-1 outline-none rounded-[4px] text-[14px] h-[36px]
                        focus:border-[#0057b8] focus:border-[2px]"
              value={store.user.email}
              disabled
            />
            <div className="text-[14px] mt-1">
              We'll send your confirmation details to <span className="font-bold">{store.user.email}</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <div className="text-[14px] font-[500]">Telephone (mobile number preferred)</div> <p className="text-[#D4111E]">*</p>
            </div>
            <input
              {...(register("phone"), { required: true })}
              name="phone"
              onChange={(e: any) => {
                const value = e.target.value
                clearErrors("phone")
                setValue("phone", value)
              }}
              className="w-full border-[1px] border-[#1a1a1a] px-3 py-1 outline-none rounded-[4px] text-[14px] h-[36px]
                        focus:border-[#0057b8] focus:border-[2px]"
            />
            {errors["phone"] && <ErrorText>{errors["phone"].message}</ErrorText>}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className="text-[20px] font-bold">Additional details</div>
            <RiErrorWarningLine size={23} />
          </div>
          {renderInput(handleChangeAdult, "Adult", storeBooking.detail?.adultNumber)}
          {storeBooking.detail?.childNumber > 0 && renderInput(handleChangeChildren, "Child", storeBooking.detail?.childNumber)}

          <button
            className="flex justify-center items-center text-[14px] gap-4 mt-4 mb-[30px] py-2 w-full font-bold rounded-[4px] bg-[#166699] text-white text-center cursor-pointer"
            // onClick={() => setStep(2)}
            type="submit"
          >
            Payment details
            <IoChevronForwardSharp size={20} />
          </button>
        </form>
      </div>
    </>
  )
}

export default StepDetail
