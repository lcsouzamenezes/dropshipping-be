import { param, validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export default [
  param('id').trim().escape().isUUID().withMessage('Invalid Id format'),
  (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(422).json({
        error: true,
        errors: errors.array(),
        code: 'create_user:invalid_data',
      })
    }

    return next()
  },
]
