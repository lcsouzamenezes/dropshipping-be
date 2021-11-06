import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateProductService } from './CreateProductService'

class CreateProductsController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { id: user_id, account_id } = request.user

    const { images, ...data } = request.body as ICreateProductDTO

    const createProductService = container.resolve(CreateProductService)

    const product = await createProductService.execute(data)

    return response.json(product)
  }
}

export { CreateProductsController }
