interface IDateProvider {
  addMiliseconds(miliseconds: number): Date
  addSeconds(seconds: number): Date
  addMinutes(minutes: number): Date
  isFuture(date: Date): boolean
}

export { IDateProvider }
