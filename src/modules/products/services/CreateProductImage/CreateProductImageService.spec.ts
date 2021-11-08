import { ProductImagesRepository } from '@modules/products/repositories/in-memory/ProductImagesRepository'
import { CreateProductImageService } from './CreateProductImageService'

let productImagesRepository: ProductImagesRepository
let createProductImageService: CreateProductImageService

describe('CreateProductImageService', () => {
  beforeEach(() => {
    productImagesRepository = new ProductImagesRepository()
    createProductImageService = new CreateProductImageService(
      productImagesRepository
    )
  })

  it('should be able to create a new image', async () => {
    const image = await createProductImageService.execute({
      product_id: '81095985577242801876729691571536',
      url: 'http://poftan.aw/gen',
    })

    expect(image).toHaveProperty('id')
  })
})
