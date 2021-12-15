import { IUpdateProductStockDTO } from '@modules/products/dtos/IUpdateProductStockDTO'
import { ProductsMapper } from '@modules/products/mappers/ProductsMapper'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateStockService } from './UpdateStockService'

export class UpdateStockController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { integration_id } = request.params
    const { code, stock } = request.body as IUpdateProductStockDTO

    const updateProductService = container.resolve(UpdateStockService)

    const product = await updateProductService.execute({
      code,
      integration_id,
      stock,
    })

    return response.json(ProductsMapper.toDTO(product))
  }
}
