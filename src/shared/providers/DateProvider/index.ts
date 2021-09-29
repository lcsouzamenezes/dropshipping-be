import { container } from 'tsyringe'
import { IDateProvider } from './IDateProvider'
import { Moment } from './implementations/Moment'

container.registerSingleton<IDateProvider>('DateProvider', Moment)
