import { ICreateSellDTO } from '@modules/sales/dtos/ICreateSellDTO'
import { ISalesRepository } from '@modules/sales/repositories/ISalesRepository'
import { EventProvider } from '@shared/providers/EventProvider/EventProvider'
import { container, inject, injectable } from 'tsyringe'

@injectable()
export class CreateSaleService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository
  ) {}

  async execute(data: ICreateSellDTO) {
    const events = container.resolve(EventProvider)

    const sell = await this.salesRepository.create(data)

    events.emit('sell-created', { sell })

    return sell
  }
}
