import { CreateAccountListener } from '@modules/accounts/listeners/CreateAccountListener'
import { EventProvider } from '@shared/providers/EventProvider/EventProvider'
import { container } from 'tsyringe'

const events = container.resolve(EventProvider)
const createAccountListener = new CreateAccountListener()

events.on('account-created', createAccountListener.handle)
