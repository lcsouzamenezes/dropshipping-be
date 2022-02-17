import { AuthotizationRequestListener } from '@modules/accounts/listeners/AuthorizationRequestListener'
import { CreateAccountListener } from '@modules/accounts/listeners/CreateAccountListener'
import { EventProvider } from '@shared/providers/EventProvider/EventProvider'
import { container } from 'tsyringe'

const events = container.resolve(EventProvider)
const createAccountListener = new CreateAccountListener()
const authotizationRequestListener = new AuthotizationRequestListener()

events.on('account-created', createAccountListener.handle)
events.on(
  'supplier-authorization-requested',
  authotizationRequestListener.handle
)
