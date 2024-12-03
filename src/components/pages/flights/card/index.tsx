import { MdOutlineFlight } from "react-icons/md"
import { MdOutlineArrowRight } from "react-icons/md"

const Card = (props: any) => {
  return (
    <>
      <div className="shadow-[rgba(0,0,0,0.12)_0px_0px_8px] rounded-[3px] overflow-hidden">
        <div className="gap-2 items-center bg-[rgba(240,240,240)] text-[rgba(120,120,120)] flex p-[4px_10px] text-[0.75rem]">
          <MdOutlineFlight size={20} className="rotate-90" />
          <div className="text-[12px] font-bold">DEPARTURE</div>
          <div>{props.data.departureDate}</div>
        </div>
        <div className="bg-[inherit] p-[20px]">
          <div className="text-[rgba(120,120,120)] flex justify-start ">
            <div className="flex gap-2 bg-[rgba(240,240,240)] items-center rounded-[999px] px-2">
              <MdOutlineFlight size={12} />
              <div className="text-[12px]">{props.data.class}</div>
            </div>
          </div>
          <div className="flex mt-5">
            <div className="flex w-[20%] items-center gap-2">
              <img src={props.data.plane.logo || ""} width={40} height={40} className="object-contain" />
              <div className="flex flex-col">
                <div className="text-[10px] font-bold text-[rgba(120,120,120)]">{props.data.plane.name}</div>
                <div className="text-[10px]">{props.data.plane.code}</div>
              </div>
            </div>
            <div className="w-[30%] text-center whitespace-nowrap">
              <div className="text-[2rem] font-bold">{props.data.from.time}</div>
              <div className="flex gap-1 justify-center">
                <div className="font-bold text-[14px]">{props.data.from.code}</div>
                <div className="text-[14px]">{props.data.from.name}</div>
              </div>
            </div>
            <div className="w-[20%] flex flex-col items-center">
              <div className="text-[12px] text-[#262626]">{props.data.duration}</div>
              <div className="items-center max-w-[64px] flex relative mt-3">
                <div className="w-[50px] h-[4px] bg-[rgba(120,120,120)]"></div>
                <MdOutlineArrowRight color="rgba(120,120,120)" size={30} className="absolute -right-[16px]" />
              </div>
            </div>
            <div className="w-[30%] text-center whitespace-nowrap">
              <div className="text-[2rem] font-bold">{props.data.from.time}</div>
              <div className="flex gap-1 justify-center">
                <div className="font-bold text-[14px]">{props.data.from.code}</div>
                <div className="text-[14px]">{props.data.from.name}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[rgba(240,240,240)] flex justify-end p-[10px]">
          <div className="flex gap-2 items-center">
            <div className="font-bold text-[1.5rem]">1.000.000đ</div>
            <button className="py-3 bg-[#41d3ff] px-4 rounded-[8px] font-bold text-black h-[fit-content] cursor-pointer">Book now</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card
