import { CiSearch } from "react-icons/ci"
import { IoRemove } from "react-icons/io5"
import { useEffect, useState } from "react"
import { VscSettings } from "react-icons/vsc"
import { useMediaQuery } from "@mui/material"
import { styled, useTheme } from "@mui/material/styles"

const locationOption = [
  {
    label: "Northern Vietnam",
    value: "Northern Vietnam"
  },
  {
    label: "Central Vietnam",
    value: "Central Vietnam"
  },
  {
    label: "Southern Vietnam",
    value: "Southern Vietnam"
  }
]

const priceOption = [
  {
    labelFrom: "0",
    labelTo: "545,554",
    fromValue: "0",
    toValue: "545554"
  },
  {
    labelFrom: "545,554",
    labelTo: "1,091,108",
    fromValue: "545554",
    toValue: "1091108"
  },
  {
    labelFrom: "1,091,108",
    labelTo: "2,045,828",
    fromValue: "1091108",
    toValue: "2045828"
  },
  {
    labelFrom: "2,045,828",
    fromValue: "2045828"
  }
]

interface Props {
  setKeyword: (value: string) => void
  setPrice: (value: any) => void
  setType: (value: any) => void
  handleFilter?: () => void
  price: any
  type: any
  keyword: string
}

const FilterComponent = (props: Props) => {
  const { setPrice, setType, price, type } = props

  const handleSetPrice = (e: any, from: string, to?: string) => {
    if (e.target.checked) {
      setPrice([...price, { fromPrice: from, toPrice: to }])
    } else {
      setPrice(price.filter((item: any) => item.fromPrice !== from || item.toPrice !== to))
    }
  }

  const handleSetType = (e: any) => {
    if (e.target.checked) {
      setType([...type, e.target.value])
    } else {
      setType(type.filter((item: any) => item !== e.target.value))
    }
  }

  return (
    <div className="mt-4 border-[1px] py-[20px] px-[20px] rounded-[8px]">
      <div className="flex justify-between border-b-[1px] pb-[20px] items-center">
        <div className="text-[16px] font-bold">Filter by:</div>
        {/* <div className="text-[14px] font-bold text-[#006ce4] cursor-pointer">Clear</div> */}
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-[500] text-[14px] mt-3">Location</div>
        {locationOption.map((item, index) => (
          <div key={index} className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" value={item.value} className="h-[18px] w-[18px]" checked={type.includes(item.value)} onChange={(e) => handleSetType(e)} />
            <div className="text-[14px]">{item.label}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-[500] text-[14px] mt-3">Price</div>
        {priceOption.map((item, index) => (
          <div key={index} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="h-[18px] w-[18px]"
              checked={price.some((value: any) => value.fromPrice === item.fromValue && value.toPrice === item.toValue)}
              onChange={(e) => handleSetPrice(e, item.fromValue, item.toValue)}
            />
            {item.fromValue && item.toValue ? (
              <div className="text-[14px]">
                VND {item.labelFrom} - VND {item.labelTo}
              </div>
            ) : (
              <div className="text-[14px]">VND {item.labelFrom}+ </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const Filter = (props: Props) => {
  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down("md"))
  const [showFilter, setShowFilter] = useState(mdDown ? false : true)
  const { setKeyword, setPrice, setType, handleFilter, price, type, keyword } = props

  return (
    <div>
      <div className="bg-[#ffb700] rounded-[8px] p-[4px]">
        <div className="relative">
          <input
            onChange={(e) => setKeyword(e.target.value)}
            className="font-normal border-b-[2px] outline-none text-[#333] rounded-t-[8px] 
                                text-[18px] px-[50px] py-[14px] px-[15px] w-full"
            value={keyword}
            placeholder="Search..."
          />
          <CiSearch className="absolute top-[15px] left-[10px]" size={28} color="#000" />
          <IoRemove className="absolute top-[15px] right-[10px] cursor-pointer" size={28} />
        </div>
        <button onClick={handleFilter} className="w-full py-3 text-[white] bg-[#006ce4] rounded-[8px] mt-2 font-bold hover:bg-[#004b9a]">
          Search
        </button>
      </div>
      {mdDown ? (
        <>
          <div onClick={() => setShowFilter(!showFilter)} className="mt-4 rounded-full px-4 py-1 bg-[rgba(240,240,240)] w-[fit-content] text-center">
            <VscSettings size={20} />
          </div>
          {showFilter && <FilterComponent keyword={keyword} type={type} price={price} setKeyword={setKeyword} setPrice={setPrice} setType={setType} />}
        </>
      ) : (
        <FilterComponent keyword={keyword} type={type} price={price} setKeyword={setKeyword} setPrice={setPrice} setType={setType} />
      )}
    </div>
  )
}

export default Filter
