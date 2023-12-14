import Axios, { AxiosInstance } from 'axios'
import { API_URL } from "../configs/global.config" 

type defConfig = {
  baseUrl : string
  timeout?: number | undefined
  headers?: any
}

const defaultConfig: defConfig = {
  baseUrl: API_URL ?? '',
  timeout: 1000 * 300,
}

Axios.defaults = { ...Axios.defaults, ...defaultConfig }

export let axios: AxiosInstance = Axios.create(defaultConfig)
