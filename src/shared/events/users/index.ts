import { ResetPassworodListener } from '@modules/users/listeners/ResetPasswordListener'
import { EventProvider } from '@shared/providers/EventProvider/EventProvider'
import { container } from 'tsyringe'

const resetPasswordListener = new ResetPassworodListener()

const events = container.resolve(EventProvider)

events.on('password-reset-request', resetPasswordListener.handle)
