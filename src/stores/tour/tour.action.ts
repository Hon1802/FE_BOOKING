import { getToursService, getTourByIdService, getHotToursService, getLatestToursService } from "@/services/tour"
import { State } from "./index"
import { BaseAction } from ".."

type Actions = BaseAction<State>

export const getTours = (params?: string) => {
  return async (actions: Actions) => {
    try {
      const res = await getToursService(params)
      actions.setState({
        ...actions.getState(),
        list: res?.tourData?.data,
        total: res?.tourData?.total
      })
    } catch (error: any) {
      actions.setState({
        ...actions.getState(),
        list: [],
        total: 0
      })
    }
  }
}

export const getToursById = (tourId: string) => {
  return async (actions: Actions) => {
    try {
      const res = await getTourByIdService(tourId)
      actions.setState({
        ...actions.getState(),
        detail: res?.tours,
        detailVehicle: res?.trans,
        detailHotel: res?.hotel
      })
    } catch (error: any) {
      actions.setState({
        ...actions.getState(),
        detail: {},
        detailVehicle: {},
        detailHotel: {}
      })
    }
  }
}

export const getHotTours = (params?: any) => {
  return async (actions: Actions) => {
    try {
      const res = await getHotToursService(params)
      actions.setState({
        ...actions.getState(),
        hotTours: res?.tourData?.data
      })
    } catch (error: any) {
      actions.setState({
        ...actions.getState(),
        hotTours: []
      })
    }
  }
}

export const getLatestTours = (params?: any) => {
  return async (actions: Actions) => {
    try {
      const res = await getLatestToursService(params)
      actions.setState({
        ...actions.getState(),
        latestTours: res?.tourData?.data
      })
    } catch (error: any) {
      actions.setState({
        ...actions.getState(),
        latestTours: []
      })
    }
  }
}
