import blingConfig from '@config/bling'
import axios, { AxiosError, AxiosRequestTransformer } from 'axios'

export function blingApi(apiKey: string) {
  const api = axios.create({
    baseURL: blingConfig.baseURL,
    params: {
      apikey: apiKey,
    },
  })

  api.interceptors.request.use(
    (config) => {
      return {
        ...config,
        url: `${config.url}/${blingConfig.type}`,
      }
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    }
  )

  return api
}
