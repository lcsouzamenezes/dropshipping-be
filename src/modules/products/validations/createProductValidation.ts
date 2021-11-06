import { NextFunction, Request, Response } from 'express'
import { check, validationResult } from 'express-validator'

// name: string
//   sku: string
//   price: number
//   stock: number
//   ean?: string
//   images?: Array<{
//     url: string
//     is_external?: boolean
//   }>
//   account_id: string
//   integration_id: string

export const createProductValidation = [
  check('name').trim().escape().not().isEmpty().withMessage('Name is required'),
  (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(422).json({
        error: true,
        errors: errors.array(),
        code: 'create_product:invalid_data',
      })
    }

    return next()
  },
]
