"use client"
import { useState, useEffect } from "react"
import Fitler from "@/components/pages/tours/list/filter"
import TourCard from "@/components/pages/tours/list/card"
import { useTours } from "@/stores/tour"
import { TOUR_MODEL } from "@/models/tour.model"
import { useRouter, useSearchParams, usePathname, useParams } from "next/navigation"
import cn from "clsx"
import ReactPaginate from "react-paginate"
import { FaChevronRight, FaChevronLeft } from "react-icons/fa"

const Tour = () => {
  const [tours, actionTours] = useTours()
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const perPage = 6
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") ? Number(searchParams.get("page")) : 1)
  const [keyword, setKeyword] = useState(searchParams.get("keyword") ? searchParams.get("keyword") : "")
  const [price, setPrice] = useState(
    searchParams.get("price")
      ? searchParams
          .get("price")
          ?.split(",")
          .map((item: any) => ({ fromPrice: item.split("-")[0], toPrice: item.split("-")[1] }))
      : []
  )
  const [type, setType] = useState(searchParams.get("type") ? searchParams.get("type")?.split(",") : [])
  const [tab, setTab] = useState(searchParams.get("tab") ? searchParams.get("tab") : "best-selling")
  const params = useParams()

  useEffect(() => {
    let body = `perPage=${perPage}&currentPage=${currentPage}&keyword=${keyword}&sortBy=${tab}&`

    if (price && price.length > 0) {
      let priceRanges: string = ""
      const priceArr = price.map((item: any) => {
        if (item.toPrice) return item.fromPrice + "-" + item.toPrice
        else return item.fromPrice
      })
      priceRanges = priceArr.join("&priceRanges=")
      if (priceRanges !== "") {
        body += `priceRanges=${priceRanges}`
      }
    }
    if (type && type.length > 0) {
      let location: string = ""
      const locationArr = type.map((item: any) => {
        return item
      })
      location = locationArr.join("&location=")
      if (location !== "") {
        body += `location=${location}`
      }
    }

    actionTours.getTours(body)
  }, [params])

  const addQueryParam = (filterParams: any) => {
    const params = new URLSearchParams()
    params.set("page", filterParams?.page)
    if (filterParams?.keyword) params.set("keyword", filterParams?.keyword)
    if (filterParams?.price?.length > 0)
      params.set(
        "price",
        filterParams?.price
          ?.map((item: any) => {
            if (item.toPrice) return item.fromPrice + "-" + item.toPrice
            else return item.fromPrice
          })
          .join(",")
      )
    if (filterParams?.type?.length > 0) params.set("type", filterParams?.type?.join(","))
    if (filterParams?.tab) params.set("tab", filterParams?.tab)
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleFilter = () => {
    addQueryParam({
      page: currentPage,
      keyword: keyword,
      price,
      type: type,
      tab: tab
    })
    setCurrentPage(1)
  }

  useEffect(() => {
    handleFilter()
  }, [price, type, tab])

  const handleChangePage = async (item: any) => {
    addQueryParam({
      page: item.selected + 1,
      keyword: keyword,
      price,
      type: type,
      tab: tab
    })
    setCurrentPage(item.selected + 1)
  }

  const CustomPagination = () => {
    const count = Number(Math.ceil(tours.total / perPage))

    return (
      <div className="w-full flex items-center justify-center mt-[10px]">
        <ReactPaginate
          className={"flex justify-center items-center pl-0 text-[14px] pagination"}
          activeClassName="pagination-active"
          pageClassName="pagination-item"
          previousClassName="pagination-nav"
          nextClassName="pagination-nav"
          breakLabel="..."
          onPageChange={handleChangePage}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          forcePage={currentPage - 1}
          pageCount={count || 1}
          renderOnZeroPageCount={null}
          previousLabel={<FaChevronLeft />}
          nextLabel={<FaChevronRight />}
        />
      </div>
    )
  }

  return (
    <div className="mb-6 container mt-[150px] grid grid-cols-[35%_65%] gap-[20px] max-md:grid-cols-1 max-md:mt-[90px]">
      <div>
        <Fitler keyword={keyword || ""} price={price} type={type} handleFilter={handleFilter} setKeyword={setKeyword} setPrice={setPrice} setType={setType} />
      </div>
      <div>
        <div className="mb-[20px] flex gap-[30px] bg-[#f5f5f5] h-[fit-content] rounded-[999px] justify-center py-1 border-[1px] border-[#f5f5f5]">
          <div
            className={cn("cursor-pointer px-[4rem] max-md:px-3 whitespace-nowrap", tab === "best-selling" && "bg-[#fff] py-1 border-[1px] border-[#000] rounded-[999px]")}
            onClick={() => setTab("best-selling")}
          >
            Most popular
          </div>
          <div
            className={cn("cursor-pointer px-[4rem] max-md:px-3 whitespace-nowrap", tab === "cheapest" && "bg-[#fff] py-1 border-[1px] border-[#000] rounded-[999px]")}
            onClick={() => setTab("cheapest")}
          >
            Lowest price
          </div>
        </div>
        <div className="flex flex-col gap-[20px]">{tours?.list?.length > 0 && tours?.list?.map((item: TOUR_MODEL) => <TourCard data={item} />)}</div>
        {tours?.list?.length > 0 ? <CustomPagination /> : <div className="flex justify-center">No data yet</div>}
      </div>
    </div>
  )
}

export default Tour
