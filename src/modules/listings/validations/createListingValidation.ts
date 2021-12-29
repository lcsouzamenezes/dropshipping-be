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
    .optional()
    .isString()
    .withMessage('Product ID must be a string'),
  check('variations')
    .optional()
    .isArray({
      min: 1,
    })
    .withMessage('Variations must be an array')
    .custom((variations, { req }) => {
      if (!req.body.product_id && !variations) {
        throw new Error(
          'Variations must be present when product Id is not provided'
        )
      }
      variations.map(
        (variation: { variation_id: string; product_id: string }) => {
          if (!variation.variation_id || !variation.product_id) {
            throw new Error(
              'Variations must be in the format {variation_id: string, product_id: string}'
            )
          }

          return variation
        }
      )
      return true
    }),
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
