"use client"
import Card from "@/components/pages/my-trip/Card"
import { useBooking } from "@/stores/booking"
import { useUser } from "@/stores/users"
import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { useRouter, useSearchParams, usePathname, useParams } from "next/navigation"
import { FaChevronRight, FaChevronLeft } from "react-icons/fa"
import Image from "next/image"
import { useLogin } from "@/hooks/useLogin"

const MyTrip = () => {
  const [store, action] = useBooking()
  const [storeUser] = useUser()
  const perPage = 6
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") ? Number(searchParams.get("page")) : 1)
  const isSpecial = useLogin()

  useEffect(() => {
    if (storeUser?.user?.id) action.getOrders({ userId: storeUser?.user?.id, currentPage, perPage })
  }, [currentPage, storeUser?.user?.id])

  const addQueryParam = (filterParams: any) => {
    const params = new URLSearchParams()
    params.set("page", filterParams?.page)

    router.push(`${pathname}?${params.toString()}`)
  }

  const handleChangePage = async (item: any) => {
    addQueryParam({
      page: item.selected + 1
    })
    setCurrentPage(item.selected + 1)
  }

  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / perPage))

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

  return isSpecial ? (
    <div className="container mx-auto mt-[150px] max-md:mt-[80px] mb-[50px]">
      <div className="text-[25px] font-bold mb-6">List of orders</div>
      <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">{store?.list?.length > 0 && store?.list?.map((item: any, index: number) => <Card key={index} data={item} />)}</div>
      {store?.list?.length > 0 ? (
        <CustomPagination />
      ) : (
        <div className="flex justify-center min-h-[300px]">
          <Image width={300} height={250} src="/no-data.png" alt="img" />
        </div>
      )}
    </div>
  ) : (
    <></>
  )
}

export default MyTrip
