import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO'
import { ProductImage } from '@modules/products/infra/typeorm/entities/ProductImage'
import { ProductsMapper } from '@modules/products/mappers/ProductsMapper'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateProductImageService } from '../CreateProductImage/CreateProductImageService'
import { CreateProductService } from './CreateProductService'

class CreateProductsController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user

    const { images, ...data } = request.body as ICreateProductDTO

    const createProductService = container.resolve(CreateProductService)
    const createProductImageService = container.resolve(
      CreateProductImageService
    )

    const product = await createProductService.execute({
      ...data,
      price: data.price * 100,
      account_id,
    })

    if (images) {
      const newImages = images.map(async (image): Promise<ProductImage> => {
        const newImage = await createProductImageService.execute({
          ...image,
          product_id: product.id,
        })
        return newImage
      })
      product.images = await Promise.all(newImages)
    }

    return response.json(ProductsMapper.toDTO(product))
  }
}

export { CreateProductsController }
