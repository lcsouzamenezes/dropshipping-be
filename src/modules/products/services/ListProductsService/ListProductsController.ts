import { ProductsMapper } from '@modules/products/mappers/ProductsMapper'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListProductsService } from './ListProductsService'

class ListProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user

    const listProductsService = container.resolve(ListProductsService)

    const products = await listProductsService.execute(account_id)

    const productsDTO = products.map((product) => ProductsMapper.toDTO(product))

    return response.json(productsDTO)
  }
}
export { ListProductsController }
