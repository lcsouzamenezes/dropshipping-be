import { Integration } from '@modules/integrations/infra/typeorm/entities/Integration'
import { Job } from '@shared/libs/Queue'
import { container } from 'tsyringe'
import { ImportBlingProductsService } from '../services/ImportProducts/Bling/ImportBlingProductsService'

export interface HandleData {
  integration: Integration
  update: boolean
}

export default {
  name: 'BlingProductImportation',
  async handle({ data }: { data: HandleData }) {
    const importBlingProductsService = container.resolve(
      ImportBlingProductsService
    )
    await importBlingProductsService.execute(data.integration, data.update)
  },
  onFailed: (job, error) => {
    //notification that the job failed
  },
} as Job
