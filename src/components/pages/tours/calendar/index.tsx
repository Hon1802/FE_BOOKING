import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import dayLocaleData from "dayjs/plugin/localeData"
import { Calendar, Badge } from "antd"
import { useState } from "react"
import Image from 'next/image'

dayjs.extend(dayLocaleData)

const CalendarComponent = () => {
  const [date, setDate] = useState(dayjs())
  const [selectedDate, setSelectedDate] = useState<any>()
  const [localeData, setLocaleData] = useState(dayjs().localeData().months(dayjs().clone()))
  const data = [{ date: '2024-06-25', time: '10:00:00' }, { date: '2024-06-26', time: '11:00:00' }]

  const dateCellRender = (value: any) => {
    return <Badge status={"success"} text={value.date()} />
  }

  const cellRender = (current: any, info: any) => {
    if (info.type === "date" && data?.map((item: any) => item.date)?.includes(current.format("YYYY-MM-DD"))) return dateCellRender(current)
    return info.originNode
  }

  return (
    <>
      <div className="w-full rounded-[8px] relative">
        <div className="bg-[#166699] p-[5px_15px] text-[white] rounded-[8px]">{localeData}</div>
        <Calendar
          fullscreen={false}
          className="calendar-wrapper px-[40px]"
          cellRender={cellRender}
          disabledDate={(current) => {
            return current < dayjs().add(-1, "days")
          }}
          value={date as any}
          headerRender={({ value, onChange }) => {
            let current = value?.clone()
            let locale = value?.localeData()
            return (
              <div className="w-full absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-1 flex items-center justify-between">
                <div
                  className={`w-[30px] h-[30px] cursor-pointer flex items-center bg-[#166699] justify-center rounded-[8px]
                     ${current?.month() - dayjs().month() === 0 ? "bg-[grey]" : null}`}
                  onClick={() => {
                    let prevMonths = dayjs()
                    if (current?.month() - dayjs().month() !== 0)
                      prevMonths = current?.clone()?.add(-1, "months")
                    setLocaleData(locale?.months(prevMonths))
                    onChange(prevMonths)
                  }}
                >
                  <Image src={"/icons/ic-chevron-right-white.svg"} width={18} height={18} priority alt={"icon"} className="transform rotate-180" />
                </div>
                <div
                  className={`w-[30px] h-[30px] cursor-pointer flex items-center bg-[#166699] justify-center rounded-[8px]
                     ${current?.month() - dayjs().month() === 3 ? "bg-[grey]" : null}`}
                  onClick={() => {
                    if (current?.month() - dayjs().month() !== 3) {
                      const nextMonths = current?.clone()?.add(1, "months")
                      setLocaleData(locale?.months(nextMonths))
                      onChange(current?.clone().add(1, "months"))
                    }
                  }}
                >
                  <Image src={"/icons/ic-chevron-right-white.svg"} width={18} height={18} priority alt={"icon"} />
                </div>
              </div>
            )
          }}
          onSelect={(newDate: any) => {
            setDate(newDate)
            if (newDate?.isSame(date)) return
            setSelectedDate(data?.length > 0 ? data?.find((item: any) => item.date === newDate?.format("YYYY-MM-DD")) : null)
          }}
        />
      </div>
    </>
  )
}

export default CalendarComponent