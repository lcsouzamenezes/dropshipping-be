import axios, { AxiosInstance, AxiosPromise, AxiosResponse } from 'axios'
import { Readable, Stream } from 'stream'

interface GetProductsFilter {
  dataInclusao?: string //date (dd/mm/YYYY) ou datetime (dd/mm/YYYY H:i:s)
  dataAlteracao?: string //date (dd/mm/YYYY) ou datetime (dd/mm/YYYY H:i:s)
  dataAlteracaoLoja?: string //date (dd/mm/YYYY) ou datetime (dd/mm/YYYY H:i:s)
  dataInclusaoLoja?: string //date (dd/mm/YYYY) ou datetime (dd/mm/YYYY H:i:s)
  tipo?: 'P' | 'S'
  situacao?: 'A' | 'I'
}

export interface GetProductsResponse {
  produtos?: Array<{
    produto: {
      id: string
      codigo: string
      descricao: string
      preco: number
      imagem: Array<{
        link: string
        tipoArmazenamento: 'interno' | 'externo'
      }>
      estoqueAtual: number
      gtin: string
    }
  }>
  erros?: [
    {
      erro: {
        cod: number
        msg: string
      }
    }
  ]
}

class Bling {
  private api: AxiosInstance

  private baseURL: string = 'https://bling.com.br/Api/v2'
  private responseFormat: 'json' | 'xml' = 'json'

  constructor(apikey: string) {
    this.api = axios.create({
      baseURL: process.env.API_URL ?? this.baseURL,
      params: {
        apikey,
      },
    })
  }

  async getProducts(
    page = 1,
    imagem: 'S' | 'N' = 'S',
    loja?: string,
    estoque: 'S' | 'N' = 'S',
    filters: GetProductsFilter = { tipo: 'P', situacao: 'A' }
  ): Promise<GetProductsResponse> {
    const { data } = await this.get<{ retorno: GetProductsResponse }>(
      'produtos',
      {
        estoque,
        loja,
        imagem,
        // filters,
      },
      page
    )

    return data.retorno
  }

  async getAllProducts(
    cb: (response: GetProductsResponse) => any,
    page = 1,
    sleep = 500
  ) {
    const response = await this.getProducts(page)
    if (response.erros?.[0].erro.cod == 14) {
      // console.log('no more results, done.')
    } else {
      await cb(response)
      page++
      return await new Promise(async (resolve) => {
        // console.log(`Fetching page ${page}...`)
        setTimeout(async () => {
          resolve(await this.getAllProducts(cb, page))
        }, sleep)
      })
    }
  }

  private get<T = any>(
    url: string,
    params?: object,
    page?: number
  ): AxiosPromise<T> {
    return this.api(
      this.applyResponseFormatToUrl(this.applyPageToUrl(url, page)),
      {
        params: {
          ...this.api.defaults.params,
          ...params,
        },
      }
    )
  }

  private applyPageToUrl(url: string, page?: number): string {
    if (page) {
      return `${url}/page=${page}`
    }
    return `${url}`
  }

  private applyResponseFormatToUrl(url: string): string {
    return `${url}/${this.responseFormat}`
  }
}

export { Bling }
