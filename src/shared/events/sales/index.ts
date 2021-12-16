import { CreateBlingOrderListener } from '@modules/sales/listners/CreateBlingOrderListener'
import { EventProvider } from '@shared/providers/EventProvider/EventProvider'
import { container } from 'tsyringe'

let createBlingOrder = new CreateBlingOrderListener()

const events = container.resolve(EventProvider)

events.on('sell-created', createBlingOrder.handle)
