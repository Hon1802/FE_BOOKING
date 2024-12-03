import { TOUR_MODEL } from "@/models/tour.model"
import { createHook, createStore } from "react-sweet-state"
import { getTours, getToursById, getHotTours, getLatestTours } from "./tour.action"

export type State = {
  list: Array<TOUR_MODEL>
  detail: TOUR_MODEL
  hotTours: Array<TOUR_MODEL>
  latestTours: Array<TOUR_MODEL>
  total: number
  detailVehicle: any
  detailHotel: any
}

const initialState: State = {
  list: [],
  hotTours: [],
  latestTours: [],
  detail: {
    id: "",
    address: "",
    delFlg: "",
    description: "",
    duration: 0,
    images: [],
    location: "",
    name: "",
    phone: "",
    plan: "",
    priceAdult: 0,
    priceChild: 0,
    regulation: "",
    estimatedTime: "",
    isApprove: false
  },
  detailVehicle: {},
  detailHotel: {},
  total: 0
}

const actions = {
  getTours,
  getToursById,
  getHotTours,
  getLatestTours
}

const Store = createStore({
  initialState,
  actions
})

export const useTours = createHook(Store)
