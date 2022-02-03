import { SellDTO } from '@modules/sales/dtos/SellDTO'
import { SalesMapper } from '@modules/sales/mappers/SalesMapper'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateSaleStatusService } from './UpdateSaleStatusService'

class UpdateSaleStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user
    const { id } = request.params
    const { status } = request.body

    const updateSaleStatusService = container.resolve(UpdateSaleStatusService)

    const sale = await updateSaleStatusService.execute({
      id,
      account_id,
      status,
    })

    const saleDTO = SalesMapper.toDTO(sale)
    return response.json(saleDTO)
  }
}

export { UpdateSaleStatusController }
