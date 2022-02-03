import { Request, Response, NextFunction } from 'express'
import { validationResult, param, body } from 'express-validator'

export const updateStatusValidation = [
  param('id').trim().escape().not().isEmpty().withMessage('Id is required'),
  body('status')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Status is required'),
  (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(422).json({
        error: true,
        errors: errors.array(),
        code: 'update_status:invalid_data',
      })
    }

    return next()
  },
]
