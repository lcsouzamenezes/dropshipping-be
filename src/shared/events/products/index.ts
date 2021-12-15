import { container } from 'tsyringe'
import { EventProvider } from '@shared/providers/EventProvider/EventProvider'

import { BlingProductsImportationEnded } from '@modules/products/listeners/BlingProductsImportationEnded'
import { BlingProductsImportationStart } from '@modules/products/listeners/BlingProductsImportationStart'
import { ProductStockUpdate } from '@modules/products/listeners/ProductStockUpdate'

const events = container.resolve(EventProvider)

const blingProductsImportationStart = new BlingProductsImportationStart()
const blingProductsImportationEnded = new BlingProductsImportationEnded()
const productStockUpdate = new ProductStockUpdate()

events.on('blingProductsImportationStart', blingProductsImportationStart.handle)
events.on('blingProductsImportationEnded', blingProductsImportationEnded.handle)
events.on('stockUpdated', productStockUpdate.handle)
