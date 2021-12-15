import { IIntegrationsRepository } from '@modules/integrations/repositories/IIntegrationsRepository'
import { IListingsRepository } from '@modules/listings/repositories/IListingsRepository'
import Queue from '@shared/libs/Queue'
import { MercadolivreAPI } from '@shared/services/MercadolivreAPI'
import axios from 'axios'
import { container } from 'tsyringe'
import { Product } from '../infra/typeorm/entities/Product'

interface ProductStockUpdateData {
  product: Product
  old_stock: number
}

export class ProductStockUpdate {
  async handle({ product, old_stock }: ProductStockUpdateData) {
    Queue.add('UpdateMercadoLivreListingsStocks', { product, old_stock })
  }
}
