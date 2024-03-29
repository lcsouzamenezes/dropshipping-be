import moment from 'moment'
import { IDateProvider } from '../IDateProvider'

class Moment implements IDateProvider {
  addMiliseconds(miliseconds: number): Date {
    return moment().add(miliseconds, 'millisecond').toDate()
  }
  addSeconds(seconds: number): Date {
    return moment().add(seconds, 'seconds').toDate()
  }

  addMinutes(minutes: number): Date {
    return moment().add(minutes, 'minutes').toDate()
  }

  isFuture(date: Date): boolean {
    const today = moment()
    const difference = today.diff(moment(date), 'seconds')
    if (difference < 0) {
      return true
    }
    return false
  }
}

export { Moment }
