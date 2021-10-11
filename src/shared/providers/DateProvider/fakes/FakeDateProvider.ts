import { IDateProvider } from '../IDateProvider'

class FakeDateProvider implements IDateProvider {
  addSeconds(seconds: number): Date {
    const now = new Date()
    return now
  }

  addMinutes(minutes: number): Date {
    const now = new Date()
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
