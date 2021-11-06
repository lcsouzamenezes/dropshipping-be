import { NextFunction, Request, Response } from 'express'
import { check, validationResult } from 'express-validator'

export default [
  check('id').trim().escape().not().isEmpty().withMessage('Id is required'),
  (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(422).json({
        error: true,
        errors: errors.array(),
        code: 'create_account:invalid_data',
      })
    }

    return next()
  },
]
