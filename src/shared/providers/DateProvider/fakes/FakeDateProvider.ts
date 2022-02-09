import { IDateProvider } from '../IDateProvider'

class FakeDateProvider implements IDateProvider {
  addMiliseconds(miliseconds: number): Date {
    const now = new Date(new Date().getTime() + miliseconds)
    return now
  }
  addSeconds(seconds: number): Date {
    const now = new Date(new Date().getTime() + seconds * 1000)
    return now
  }

  addMinutes(minutes: number): Date {
    const now = new Date(new Date().getTime() + minutes * 60000)
    return now
  }

  isFuture(date: Date): boolean {
    const today = new Date()
    const validating = new Date(date)
    if (today < validating) {
      return true
    }
    return false
  }
}

export { FakeDateProvider }
