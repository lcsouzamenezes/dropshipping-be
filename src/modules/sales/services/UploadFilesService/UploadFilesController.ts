import { SalesMapper } from '@modules/sales/mappers/SalesMapper'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UploadFilesService } from './UploadFilesService'

interface IRequest {
  body: {
    id: string
  }
  files: {
    [fieldname: string]: Express.Multer.File[]
  }
}

export class UploadFilesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      body: { id },
      files,
    } = request as IRequest

    const uploadFilesService = container.resolve(UploadFilesService)

    const sale = await uploadFilesService.execute({ id, files })
    const saleDTO = SalesMapper.toDTO(sale)

    return response.send(saleDTO)
  }
}
