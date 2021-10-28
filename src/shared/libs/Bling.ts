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

interface GetProductsResponse {
  produtos: Array<{
    produto: {
      codigo: string
      descricao: string
      preco: number
      imagem: Array<{
        link: string
        tipoArmazenamento: 'interno' | 'externo'
      }>
      estoqueAtual: number
    }
  }>
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
        page,
        estoque,
        loja,
        imagem,
        // filters,
      }
    )

    return data.retorno
  }

  private get<T = any>(url: string, params?: object): AxiosPromise<T> {
    return this.api(`${url}/${this.responseFormat}`, {
      params: {
        ...this.api.defaults.params,
        ...params,
      },
    })
  }
}

export { Bling }
