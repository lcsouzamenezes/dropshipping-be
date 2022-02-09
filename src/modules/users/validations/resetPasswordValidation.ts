import { Request, Response, NextFunction } from 'express'
import { check, validationResult } from 'express-validator'

export default [
  check('email')
    .trim()
    .escape()
    .isEmail()
    .withMessage('Invalid E-mail')
    .not()
    .isEmpty()
    .withMessage('E-mail is required'),
  (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(422).json({
        error: true,
        errors: errors.array(),
        code: 'reset_password:invalid_data',
      })
    }

    return next()
  },
]
