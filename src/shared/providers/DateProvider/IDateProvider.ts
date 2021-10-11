interface IDateProvider {
  addSeconds(seconds: number): Date
  addMinutes(minutes: number): Date
  isFuture(date: Date): boolean
}

export { IDateProvider }
