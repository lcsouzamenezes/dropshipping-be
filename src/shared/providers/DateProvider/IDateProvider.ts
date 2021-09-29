interface IDateProvider {
  addSeconds(seconds: number): Date
  addMinutes(minutes: number): Date
}

export { IDateProvider }
