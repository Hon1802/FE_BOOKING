import API from "@/configs/api/repository-api"

export const getTourByIdService = (tourId: string): Promise<any> => {
  return API.get(`/get-tour-by-id/`, { tourId }) as any
}

export const getToursService = (params?: string): Promise<any> => {
  return API.get(`/tours/filter?${params}`) as any
}

export const getHotToursService = (params?: any): Promise<any> => {
  return API.get(`/hot-tours`, { ...params }) as any
}

export const getLatestToursService = (params?: any): Promise<any> => {
  return API.get(`/latest-tours`, { ...params }) as any
}
