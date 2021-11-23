import { ProductsMapper } from '@modules/products/mappers/ProductsMapper'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListSuppliersProductsService } from './ListSuppliersProductsService'

interface RequestQuery {
  search?: string
  supplier?: string
}

class ListSuppliersProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user

    const { search, supplier } = request.query as RequestQuery

    const listSuppliersProductsService = container.resolve(
      ListSuppliersProductsService
    )

    const products = await listSuppliersProductsService.execute({
      account_id,
      search,
      supplier,
    })

    const productsDTO = products.map((product) => ProductsMapper.toDTO(product))

    return response.json(productsDTO)
  }
}

export { ListSuppliersProductsController }
