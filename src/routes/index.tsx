import { FaRegUser } from "react-icons/fa"
import { TiShoppingBag } from "react-icons/ti"

export const navigation = [
  {
    title: "Home",
    url: "/"
  },
  {
    title: "Tour",
    submenu: [
      {
        title: "Northern Vietnam",
        url: "/tours?type=Northern+Vietnam"
      },
      {
        title: "Central Vietnam",
        url: "/tours?type=Central+Vietnam"
      },
      {
        title: "Southern Vietnam",
        url: "/tours?type=Southern+Vietnam"
      }
    ]
  },
  {
    title: "Contact",
    url: "/contact"
  }
]

export const userRoutes = [
  {
    title: "Manage account",
    url: "/profile",
    icon: <FaRegUser size={16} />
  },
  {
    title: "Bookings & Trips",
    url: "/my-trip",
    icon: <TiShoppingBag size={18} />
  }
]
