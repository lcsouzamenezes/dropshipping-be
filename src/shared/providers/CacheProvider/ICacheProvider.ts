export interface Options {
  ttl: number
}

interface ICacheProvider {
  set<T = any>(key: string, value: T, opt?: Options): Promise<boolean>
  get<T = unknown>(key: string): Promise<T>
  flush(): Promise<void>
}

export { ICacheProvider }
