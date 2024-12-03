import { AxiosRequestHeaders } from "axios"
import { isBlob, isFile } from "@/helpers/base.helper"
import axiosClient from "./client-axios"

export const getFormData = (object: Record<string, unknown>) =>
  Object.keys(object).reduce((formData, key) => {
    const listValue: Array<any> = Array.isArray(object[key]) ? (object[key] as Array<any>) : [object[key]]
    listValue.forEach((value) => {
      if (typeof value === "string" || isBlob(value) || isFile(value)) {
        formData.append(key, value)
      } else if (typeof value === "number") {
        formData.append(key, JSON.stringify(value))
      } else if (typeof value === "object") {
        formData.append(key, JSON.stringify(value))
      } else {
        formData.append(key, value)
      }
    })
    return formData
  }, new FormData())

const API = {
  get: (url: string, params: Record<string, unknown> = {}, header: AxiosRequestHeaders = {}): Promise<any> => {
    return axiosClient.get(url, {
      params,
      headers: { ...header }
    })
  },
  post: (
    url: string,
    payload: {
      params?: Record<string, unknown>
      body?: Record<string, unknown>
    } = {
      params: {},
      body: {}
    }
  ): Promise<any> => {
    return axiosClient.post(url, payload.body, {
      params: payload.params
    })
  },
  postFormData: (
    url: string,
    payload: {
      params?: Record<string, unknown>
      body?: Record<string, unknown>
    } = {
      params: {},
      body: {}
    }
  ): Promise<any> => {
    return axiosClient.post(url, getFormData(payload.body || {}), {
      params: payload.params
    })
  },
  put: (
    url: string,
    payload: {
      params?: Record<string, unknown>
      body?: Record<string, unknown>
    } = {
      params: {},
      body: {}
    }
  ): Promise<any> => {
    return axiosClient.put(url, payload.body, {
      params: payload.params
    })
  },
  putFormData: (
    url: string,
    payload: {
      params?: Record<string, unknown>
      body?: Record<string, unknown>
    } = {
      params: {},
      body: {}
    }
  ): Promise<any> => {
    return axiosClient.put(url, getFormData(payload.body || {}), {
      params: payload.params
    })
  },
  patch: (
    url: string,
    payload: {
      params?: Record<string, unknown>
      body?: Record<string, unknown>
    } = {
      params: {},
      body: {}
    }
  ): Promise<any> => {
    return axiosClient.patch(url, payload.body, {
      params: payload.params
    })
  },
  patchFormData: (
    url: string,
    payload: {
      params?: Record<string, unknown>
      body?: Record<string, unknown>
    } = {
      params: {},
      body: {}
    }
  ): Promise<any> => {
    return axiosClient.patch(url, getFormData(payload.body || {}), {
      params: payload.params
    })
  },
  delete: (url: string, params: Record<string, unknown> = {}): Promise<any> => {
    return axiosClient.delete(url, { params })
  },
  deleteFormData: (
    url: string,
    payload: {
      body?: Record<string, unknown>
    } = {
      body: {}
    }
  ): Promise<any> => {
    return axiosClient.delete(url, { data: payload?.body })
  }
}

export default API
