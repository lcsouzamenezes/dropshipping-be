import { Product } from '@modules/products/infra/typeorm/entities/Product'
import { ProductsMapper } from '@modules/products/mappers/ProductsMapper'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListProductsService } from './ListProductsService'
import { SearchProductsService } from './SearchProductService'

interface RequestQuery {
  search?: string
}

class ListProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user

    const { search } = request.query as RequestQuery

    let products: Product[]

    if (search) {
      const searchProductsService = container.resolve(SearchProductsService)
      products = await searchProductsService.execute({ search, account_id })
    } else {
      const listProductsService = container.resolve(ListProductsService)
      products = await listProductsService.execute(account_id)
    }

    const productsDTO = products.map((product) => ProductsMapper.toDTO(product))

    return response.json(productsDTO)
  }
}
export { ListProductsController }
