"use client"
import * as React from "react"
import { MdTour } from "react-icons/md"
import { IoChevronDown } from "react-icons/io5"
import { usePathname } from "next/navigation"
import { CiSearch, CiLogin } from "react-icons/ci"
import { FaPhone } from "react-icons/fa"
import Login from "@/components/pages/auth/login"
import { navigation } from "@/routes"
import { getFromLocalStorage } from "@/helpers/base.helper"
import { useAuth } from "@/stores/auth"
import dynamic from "next/dynamic"
import { useUser } from "@/stores/users"

const UserDropdown = dynamic(() => import("./user-dropdown"), {
  ssr: false
})

export default function Header() {
  const pathName = usePathname()
  const [isPageScroll, setIsPageScroll] = React.useState(pathName === "/" || pathName === "/flights" ? false : true)
  const [showSubmenu, setShowSubmenu] = React.useState(-1)
  const [showSubHeader, setShowSubHeader] = React.useState(true)
  const isLogin = getFromLocalStorage("isLogin")
  const userData = getFromLocalStorage("userData")
  const [storeAuth, actionAuth] = useAuth()
  const [storeUser, actionUser] = useUser()

  React.useEffect(() => {
    if (isLogin && userData?.id) actionUser.getUserById(userData?.id)
  }, [isLogin, userData?.id])

  React.useEffect(() => {
    userData?.id && actionAuth.setUser({ userData, isLogin: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    setIsPageScroll(pathName === "/" || pathName === "/flights" ? false : true)
    if (pathName === "/" || pathName === "/flights") {
      const handleScroll = () => {
        if (window.scrollY >= 70) {
          setIsPageScroll(true)
          setShowSubHeader(false)
        } else {
          setIsPageScroll(false)
          setShowSubHeader(true)
        }
      }
      window.addEventListener("scroll", handleScroll)

      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    } else {
      const handleScroll = () => {
        if (window.scrollY >= 70) setShowSubHeader(false)
        else setShowSubHeader(true)
      }
      window.addEventListener("scroll", handleScroll)

      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName, window.location.href])

  const handleShowSubmenu = (index: Number) => {
    if (showSubmenu === -1) return "hidden"
    if (showSubmenu !== -1 && showSubmenu === index) return "block"
    return "hidden"
  }

  return (
    <div className="flex flex-col justify-center font-bold text-white">
      <div className={`flex flex-col items-center w-full ${isPageScroll ? "bg-[#166699]" : "bg-[rgba(255,255,255,0.1)]"} fixed z-[99] top-0`}>
        {showSubHeader && (
          <div className="container max-w-full max-md:hidden mt-2">
            <div className="border-b-[1px] border-b-[rgb(255_255_255/18%)] flex justify-between pb-2">
              <div className="flex gap-4 items-center">
                <div className="flex gap-2 items-center">
                  <FaPhone color="#fff" size={20} />
                  <a href="tel:09123456789" className="text-[#fff]">
                    09123456789
                  </a>
                </div>
                <div className="relative">
                  <input
                    className="font-normal border-none outline-none rounded-[999px] text-[#333] 
                                text-[12px] w-[200px] h-[25px] px-[15px] bg-[rgba(255,255,255,0.7)]"
                    placeholder="Search..."
                  />
                  <CiSearch className="absolute top-[5px] right-[5px]" color="#000" />
                </div>
              </div>
              {isLogin && userData?.id ? (
                <UserDropdown />
              ) : (
                <div className="flex gap-2 items-center cursor-pointer hover:text-[black]" onClick={() => actionAuth.setOpenLogin(true)}>
                  <CiLogin size={23} />
                  Login
                </div>
              )}
            </div>
          </div>
        )}
        <div className="container flex gap-[10rem] h-[70px] items-center max-w-full max-md:flex-wrap max-md:justify-center">
          <a href="/" className="text-[30px] flex items-center gap-2">
            <MdTour size={32} />
            <div className="text-[white] font-bold">
              Booking<span className="text-[black]">Now</span>
            </div>
          </a>
          <div className="max-w-[50%] justify-center w-full flex gap-[35px] self-stretch my-auto text-base tracking-normal leading-6 text-center max-lg:gap-[20px] max-md:hidden">
            {navigation.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`${pathName === item?.url && "bg-[rgba(255,255,255,0.4)]"} relative hover:bg-[rgba(255,255,255,0.4)] px-2`}
                  onMouseOver={() => setShowSubmenu(index)}
                  onMouseLeave={() => setShowSubmenu(-1)}
                >
                  <div className="uppercase cursor-pointer h-[70px] flex flex-col justify-center">
                    <a href={item.url} className="flex items-center gap-1">
                      {item.title} {item?.submenu && <IoChevronDown />}
                    </a>
                  </div>
                  {item?.submenu && (
                    <div className={`shadow-[0_0_12px_-3px_rgba(0,0,0,.4)] absolute top-[70px] left-0 bg-[white] flex flex-col min-w-[200px] ${handleShowSubmenu(index)}`}>
                      {item?.submenu.map((item: any, index: number) => {
                        return (
                          <a href={item.url} key={index} className="text-left px-2 py-3 hover:text-[#166699] text-[black] font-normal">
                            {item.title}
                          </a>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <Login isOpen={storeAuth.isModalLogin} setOpenModal={actionAuth.setOpenLogin} />
    </div>
  )
}
