import { IUpdateProductDTO } from '@modules/products/dtos/IUpdateProductDTO'
import { ProductsMapper } from '@modules/products/mappers/ProductsMapper'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateProductService } from './UpdateProductService'

class UpdateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user
    const { id } = request.params
    const { name, ean, integration_id, price, sku, stock, images } =
      request.body as IUpdateProductDTO

    const updateProductService = container.resolve(UpdateProductService)

    const product = await updateProductService.execute({
      id,
      account_id,
      name,
      ean,
      integration_id,
      price,
      sku,
      stock,
      images,
    })

    return response.json(ProductsMapper.toDTO(product))
  }
}

export { UpdateProductController }
