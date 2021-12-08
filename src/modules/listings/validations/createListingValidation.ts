import { Request, Response, NextFunction } from 'express'
import { check, validationResult } from 'express-validator'

export const createListingValidation = [
  check('code')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Integrations ID is required'),
  check('active')
    .trim()
    .escape()
    .optional()
    .isBoolean()
    .withMessage('Active must be boolean'),
  check('product_id')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Product ID is required'),
  check('integration_id')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Integrations ID is required'),
  (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(422).json({
        error: true,
        errors: errors.array(),
        code: 'import_products:invalid_data',
      })
    }

    return next()
  },
]
