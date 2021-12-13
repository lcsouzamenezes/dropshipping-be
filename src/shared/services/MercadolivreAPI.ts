import axios, { AxiosError } from 'axios'

import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider'

import mercadolivre from '@config/mercadolivre'
import { Integration } from '@modules/integrations/infra/typeorm/entities/Integration'
import { container } from 'tsyringe'
import { IIntegrationsRepository } from '@modules/integrations/repositories/IIntegrationsRepository'

interface RefreshTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
  user_id: number
  refresh_token: string
}

let isRefreshingTheToken = false
let failedRequestsQueue = []

const dateProvider = container.resolve<IDateProvider>('DateProvider')

async function updateRefreshToken(integration: Integration): Promise<string> {
  const integrationsRepository = container.resolve<IIntegrationsRepository>(
    'IntegrationsRepository'
  )

  const { data } = await axios.post<RefreshTokenResponse>(
    `${mercadolivre.baseURL}/oauth/token?grant_type=refresh_token&client_id=${process.env.ML_APP_ID}&client_secret=${process.env.ML_APP_SECRET}&refresh_token=${integration.refresh_token}`
  )
  Object.assign(integration, {
    expires_at: dateProvider.addSeconds(data.expires_in),
    refresh_token: data.refresh_token,
    access_token: data.access_token,
  } as Integration)
  await integrationsRepository.update(integration)

  return data.access_token
}

export async function MercadolivreAPI(integration: Integration) {
  if (!dateProvider.isFuture(new Date(integration.expires_at))) {
    const accessToken = await updateRefreshToken(integration)
    integration.access_token = accessToken
  }

  const api = axios.create({
    baseURL: mercadolivre.baseURL,
    headers: {
      Authorization: `Bearer ${integration.access_token}`,
    },
  })

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response.status === 401) {
        if (error.response.data.message == 'expired_token') {
          const originalRequestConfig = error.config

          if (!isRefreshingTheToken) {
            isRefreshingTheToken = true
            updateRefreshToken(integration)
              .then((accessToken) => {
                api.defaults.headers['Authorization'] = `Bearer ${accessToken}`
                failedRequestsQueue.forEach((request) => {
                  request.resolve(accessToken)
                })
              })
              .catch((error) => {
                failedRequestsQueue.forEach((request) => {
                  request.reject(error)
                })
                failedRequestsQueue = []
              })
              .finally(() => {
                isRefreshingTheToken = false
              })
          }

          return new Promise((reject, resolve) => {
            failedRequestsQueue.push({
              resolve: (token: string) => {
                originalRequestConfig.headers[
                  'Authorizaton'
                ] = `Bearer ${token}`
                resolve(api(originalRequestConfig))
              },
              reject: (err: AxiosError) => {
                reject(err)
              },
            })
          })
        }
      }
      return Promise.reject(error)
    }
  )

  return api
}
