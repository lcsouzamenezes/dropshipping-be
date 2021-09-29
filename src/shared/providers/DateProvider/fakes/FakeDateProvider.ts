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
}

export { FakeDateProvider }
