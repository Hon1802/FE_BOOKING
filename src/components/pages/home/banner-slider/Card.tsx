import { formatCurrencyNoUnit } from "@/helpers/base.helper"
import { useRouter } from "next/navigation"

const Card = (props: any) => {
  const router = useRouter()
  const { data } = props

  return (
    <div>
      <div
        style={{ backgroundImage: `url("${data?.images[0]?.urlImage}")`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
        className="min-h-screen max-md:min-h-[377px] before:bg-[#000] before:bg-opacity-[0.2] before:absolute before:inset-0 relative h-auto overflow-visible"
      >
        <div className="container relative z-[1] min-h-[600px] max-md:min-h-[377px] flex items-center">
          <div className="max-w-[700px] flex flex-col gap-4">
            <div className="text-[#fff] text-[52px] font-bold uppercase max-md:text-[20px]">{data?.name}</div>
            <div className="text-[30px] leading-[32px] font-[400] max-md:text-[12px] max-md:leading-[16px] tracking-[0.4px] text-[white]">
              Price: <span className="font-bold">{formatCurrencyNoUnit(data?.priceAdult)} VNĐ</span>
            </div>
            <div
              onClick={() => router.push(`/tours/${data?.id}`)}
              className="cursor-pointer w-[136px] h-[36px] bg-[transparent] rounded-[999px] flex items-center justify-center border-[2px] border-[white] text-[white] uppercase text-[17px] "
            >
              Book Now
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
