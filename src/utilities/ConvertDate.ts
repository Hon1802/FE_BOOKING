import moment from "moment"

export const convertDateString = (value: string) => {
  return moment(value).format("DD-MM-YYYY")
}
export const convertDate = (value: string) => {
  return moment(value?.toString()).format("DD-MM-YYYY")
}
export const convertDateDefault = (value: string) => {
  return moment(value).format("YYYY-MM-DD")
}

export const convertDateMonthFirst = (value: string) => {
  return moment(value).format("MM-DD-YYYY")
}

export const convertDateDefaultV2 = (value: string) => {
  return moment(value).format("YYYY/MM/DD")
}

export const convertDateDefaultV3 = (value: string) => {
  return moment(value).format("DD/MM/yyyy")
}

export const convertDateDefaultV4 = (value: string) => {
  return moment(value).format("MM/DD/yyyy")
}

export const getDateTimeString = (value: string) => {
  return moment(value).format("HH:mm DD/MM/YYYY")
}
const viLocale = {
  months: "Tháng 1_Tháng 2_Tháng 3_Tháng 4_Tháng 5_Tháng 6_Tháng 7_Tháng 8_Tháng 9_Tháng 10_Tháng 11_Tháng 12".split("_"),
  monthsShort: "Thg1_Thg2_Thg3_Thg4_Thg5_Thg6_Thg7_Thg8_Thg9_Thg10_Thg11_Thg12".split("_"),
  weekdays: "Chủ Nhật_Thứ Hai_Thứ Ba_Thứ Tư_Thứ Năm_Thứ Sáu_Thứ Bảy".split("_"),
  weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"),
  weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM [năm] YYYY",
    LLL: "D MMMM [năm] YYYY HH:mm",
    LLLL: "dddd, D MMMM [năm] YYYY HH:mm"
  },
  calendar: {
    sameDay: "[Hôm nay] LT",
    nextDay: "[Ngày mai] LT",
    nextWeek: "dddd [tuần tới] LT",
    lastDay: "[Hôm qua] LT",
    lastWeek: "dddd [tuần rồi] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "%s tới",
    past: "%s trước",
    s: "vài giây",
    ss: "%d giây",
    m: "một phút",
    mm: "%d phút",
    h: "một giờ",
    hh: "%d giờ",
    d: "một ngày",
    dd: "%d ngày",
    w: "một tuần",
    ww: "%d tuần",
    M: "một tháng",
    MM: "%d tháng",
    y: "một năm",
    yy: "%d năm"
  },
  ordinalParse: /\d{1,2}/,
  ordinal: "%d"
} as object

export const formatTimeAgo: any = (input: any) => {
  moment.updateLocale("vi", viLocale)
  const inputTime = moment(input)
  const inputTimeEn = moment(input).locale("en")
  const vi = inputTime.fromNow()
  const en = inputTimeEn.fromNow()
  return { en, vi }
}

export const renderTimeCallAPI = (value: any, isEnd?: boolean) => {
  if (!value) return null
  const timeData = new Date().getTimezoneOffset() / -60
  const newTime = timeData >= 0 ? timeData : -1 * timeData
  const now = new Date(0, 0)
  now.setMinutes(+Math.round(newTime * 60))
  const hours = now.getHours()
  const minutes = now.getMinutes()

  const time = `${hours >= 10 ? hours : `0${hours}`}:${minutes >= 10 ? minutes : `0${minutes}`}`
  return `${value}${isEnd ? "T23:59:59" : "T00:00:00"}${timeData >= 0 ? "+" : "-"}${time}`
}
