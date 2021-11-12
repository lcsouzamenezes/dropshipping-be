import { Request, Response, NextFunction } from 'express'
import { check, validationResult } from 'express-validator'

export default [
  check('name').trim().escape().not().isEmpty().withMessage('Name is required'),
  check('email')
    .trim()
    .escape()
    .isEmail()
    .withMessage('Invalid E-mail')
    .not()
    .isEmpty()
    .withMessage('E-mail is required'),
  check('password')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Password is required')
    .isLength({
      min: 8,
    })
    .withMessage('Password must have at least 8 characters')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%¨&*])/)
    .withMessage(
      'Password must have lower and uppercase letters number and symbol'
    ),
  check('active').isBoolean().optional(),
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
