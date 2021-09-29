import moment from 'moment'
import { IDateProvider } from '../IDateProvider'

class Moment implements IDateProvider {
  addSeconds(seconds: number): Date {
    return moment().add(seconds, 's').toDate()
  }

  addMinutes(minutes: number): Date {
    return moment().add(minutes, 'm').toDate()
  }
}

export { Moment }
