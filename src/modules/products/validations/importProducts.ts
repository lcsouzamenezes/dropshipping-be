import { NextFunction, Request, Response } from 'express'
import { validationResult, param, check } from 'express-validator'

export const importProducts = [
  param('source')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Source is required'),
  check('integration')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Integration is required'),
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
