import { Request, Response, NextFunction } from 'express'
import { validationResult, query } from 'express-validator'

export const listProductsValidation = [
  query('search')
    .trim()
    .escape()
    .optional()
    .isString()
    .withMessage('Search must be a string'),
  (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(422).json({
        error: true,
        errors: errors.array(),
        code: 'list_products:invalid_data',
      })
    }

    return next()
  },
]
