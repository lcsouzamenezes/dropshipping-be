import { ProductsMapper } from '@modules/products/mappers/ProductsMapper'
import { AppError } from '@shared/errors/AppError'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetProductService } from './GetProductService'

class GetProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user

    const { id } = request.params

    const getProductService = container.resolve(GetProductService)

    const product = await getProductService.execute({
      product_id: id,
      account_id,
      options: {
        relations: ['images'],
      },
    })

    if (!product) {
      throw new AppError('Product not found', 'get_product:not_found', 404)
    }

    return response.json(ProductsMapper.toDTO(product))
  }
}

export { GetProductController }
