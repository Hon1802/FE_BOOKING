import { MdTour } from "react-icons/md"
import Link from "next/link"
import React from "react"

const Logo = () => {
  return (
    <Link href="/" className="flex-shrink-0 block md:flex items-center justify-start">
      <MdTour size={32} />
    </Link>
  )
}

export default Logo
