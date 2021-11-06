import { Request, Response, NextFunction } from 'express'
import { SelectQueryBuilder } from 'typeorm'

declare module 'typeorm' {
  interface SelectQueryBuilder<Entity> {
    paginate: () => Promise<Entity[]>
  }
}

interface QueryParams {
  page?: number
  perPage?: number
}

function Paginate(perPage: number = 100) {
  return function (request: Request, response: Response, next: NextFunction) {
    const requestQueryParams = request.query as QueryParams
    let page = Number(requestQueryParams.page)
    if (requestQueryParams.perPage) {
      perPage = Number(requestQueryParams.perPage)
    }

    if (!page) {
      page = 1
    }

    SelectQueryBuilder.prototype.paginate = async function <Entity>() {
      const query = this as SelectQueryBuilder<Entity>
      const countQuery = query
      const total = await countQuery.getCount()

      response.append('X-Total-Count', String(total))

      const data = await query
        .skip((page - 1) * perPage)
        .take(perPage)
        .getMany()

      return data
    }

    return next()
  }
}

export { Paginate }
