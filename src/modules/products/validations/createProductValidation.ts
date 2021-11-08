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
  check('integration_id')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Integrations ID is required'),
  check('ean').trim().escape().not(),
  check('sku').trim().escape().not().isEmpty().withMessage('SKU is required'),
  check('stock')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Stock is required')
    .isFloat()
    .withMessage('Stock must be float'),
  check('price')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Price is required'),
  check('images.*.url')
    .trim()
    .isURL()
    .withMessage('Invalid URL')
    .not()
    .isEmpty()
    .withMessage('Image URL is required'),
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
