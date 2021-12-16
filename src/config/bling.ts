interface BlingConfig {
  baseURL: string
  type: 'json' | 'xml'
}

export default {
  baseURL: 'https://bling.com.br/Api/v2',
  type: 'json',
} as BlingConfig
