"use client"
import Image from "next/image"
import { userRoutes } from "@/routes"
import { useState, useRef, useEffect } from "react"
import { BiLogOut } from "react-icons/bi"
import { useAuth } from "@/stores/auth"
import { getFromLocalStorage } from "@/helpers/base.helper"
import { useUser } from "@/stores/users"

const UserDropdown = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const catMenu = useRef<HTMLDivElement>(null)
  const [storeAuth, actionAuth] = useAuth()
  const [storeUser, actionUser] = useUser()
  const userData = getFromLocalStorage("userData")

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDropdown)
  }, [catMenu, showMenu])

  const handleClickOutsideDropdown = (e: any) => {
    if (showMenu && !catMenu?.current?.contains(e.target as Node)) {
      setShowMenu(false)
    }
  }

  const handleLogout = () => {
    actionAuth.logoutAsync({ id: userData?.id })
  }

  return (
    <div onClick={() => setShowMenu(!showMenu)} ref={catMenu} className="z-[10] relative flex gap-2 items-center cursor-pointer rounded-[4px]">
      <div className="rounded-[999px] w-[30px] h-[30px] relative border border-[#fcba03] border-[1px]">
        <Image fill src={storeUser?.user?.urlAvatar || "/defaultAvatar.png"} alt="avatar" className="rounded-[999px] object-cover" />
      </div>
      <div className="text-[14px]">{storeUser.user?.name}</div>
      {showMenu && userRoutes && (
        <div className={`rounded-[8px] shadow-[0_0_12px_-3px_rgba(0,0,0,.4)] absolute top-[50px] right-0 bg-[white] flex flex-col min-w-[200px] `}>
          {userRoutes?.map((item: any, index: number) => {
            return (
              <a href={item.url} key={index} className="text-left px-2 py-3 hover:text-[#166699] text-[black] font-normal flex gap-2 items-center">
                {item?.icon && item.icon}
                {item.title}
              </a>
            )
          })}
          <div onClick={handleLogout} className="hover:text-[#166699] text-[black] px-2 pb-3 pt-1 font-normal flex gap-2 items-center">
            <BiLogOut size={18} />
            Logout
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDropdown
