import Queue from '@shared/libs/Queue'
import { Sell } from '../infra/typeorm/entities/Sell'

interface CreateBlingOrderListenerData {
  sell: Sell
}

export class CreateBlingOrderListener {
  async handle({ sell }: CreateBlingOrderListenerData): Promise<void> {
    Queue.add('CreateBlingSale', {
      sell,
    })
  }
}
