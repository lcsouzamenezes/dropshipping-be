import { container } from 'tsyringe'
import { EventProvider } from '@shared/providers/EventProvider/EventProvider'

import { BlingProductsImportationEnded } from '@modules/products/listeners/BlingProductsImportationEnded'
import { BlingProductsImportationStart } from '@modules/products/listeners/BlingProductsImportationStart'

const events = container.resolve(EventProvider)

const blingProductsImportationStart = new BlingProductsImportationStart()
const blingProductsImportationEnded = new BlingProductsImportationEnded()

events.on('blingProductsImportationStart', blingProductsImportationStart.handle)
events.on('blingProductsImportationEnded', blingProductsImportationEnded.handle)
