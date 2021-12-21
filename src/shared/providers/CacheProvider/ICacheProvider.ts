export interface Options {
  ttl: number
}

interface ICacheProvider {
  set<T = any>(key: string, value: T, opt?: Options): Promise<boolean>
  get<T = unknown>(key: string): Promise<T>
  unset(key: string): Promise<void>
  flush(): Promise<void>
}

export { ICacheProvider }
