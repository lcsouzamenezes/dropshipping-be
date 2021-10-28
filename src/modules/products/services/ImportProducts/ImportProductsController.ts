import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ImportProductsService } from './ImportProductsService'

interface RequestParams {
  source: 'bling'
}

interface RequestBody {
  integration: string
  update?: boolean
}

class ImportProductsController {
  async handle(
    request: Request<RequestParams, any, RequestBody>,
    response: Response
  ): Promise<Response> {
    const { account_id } = request.user

    const { source } = request.params

    const { integration, update } = request.body

    const importProductsService = container.resolve(ImportProductsService)

    await importProductsService.execute({
      source,
      integration: {
        id: integration,
        account_id,
      },
      update,
    })

    return response.json({
      status: 'success',
      message: 'Importation in progress',
    })
  }
}

export { ImportProductsController }
