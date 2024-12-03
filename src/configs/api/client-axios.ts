import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios"
import { KEY_COOKIE } from "@/constants/key-cookie.constant"
import { BASE_CONSTANTS } from "@/constants/base.constant"
import { getFromCookieWithName, removeCookie, removeFromLocalStorage, saveToCookie, saveToLocalStorage } from "@/helpers/base.helper"
import queryString from "query-string"

const axiosClient = axios.create({
  baseURL: BASE_CONSTANTS.BASE_URL,
  timeout: 20000,
  paramsSerializer: (params: Record<string, any>) => {
    return queryString.stringify(params, { arrayFormat: "bracket" })
  }
})

axiosClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getFromCookieWithName(null, KEY_COOKIE.TOKEN) //token is value
    const headers: AxiosRequestHeaders = {
      Authorization: `Bearer ${token}`
    }

    if (token) config.headers = { ...config.headers, ...headers }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

axiosClient.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res && res.data) return res.data
    return res
  },
  async (err: AxiosError) => {
    if (err.response && err.response?.status === 401) {
      removeFromLocalStorage("breadCrumb")
      removeFromLocalStorage("token")
      removeFromLocalStorage("isLogin")
      removeFromLocalStorage("userData")
      removeCookie(null, KEY_COOKIE.TOKEN)
      removeCookie(null, KEY_COOKIE.REFRESH_TOKEN, { path: "/" })
      window.location.href = "/"
    }
    if (err.response && err.response.data) return err.response.data
    return Promise.reject(err)
  }
)

export default axiosClient

const refreshInstance = axios.create({
  baseURL: BASE_CONSTANTS.BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "X-Frame-Options": "SAMEORIGIN",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
  },
  paramsSerializer: (params: Record<string, any>) => {
    return queryString.stringify(params)
  }
})

refreshInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getFromCookieWithName(null, KEY_COOKIE.REFRESH_TOKEN)
    if (!token) {
      return config
    }
    const headers: AxiosRequestHeaders = {
      Authorization: `Bearer ${token}`
    }

    if (token) config.headers = { ...config.headers, ...headers }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

refreshInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res && res.data) {
      if (!res.data.error) {
        saveToLocalStorage("token", res.data.data.accessToken)
        saveToCookie(null, KEY_COOKIE.REFRESH_TOKEN, res.data.data.refreshToken, { path: "/" })
        saveToCookie(null, KEY_COOKIE.TOKEN, res.data.data.accessToken, {
          path: "/"
        })
      } else {
        throw new Error(res.data.message + "from refersh token")
      }
      return res.data
    }
    return res
  },
  async (err: AxiosError) => {
    removeCookie(null, KEY_COOKIE.REFRESH_TOKEN)
    removeCookie(null, KEY_COOKIE.TOKEN)
    if (typeof localStorage !== "undefined") {
      removeFromLocalStorage("token")
    }
    if (err.response) return err.response
    return Promise.reject(err)
  }
)
