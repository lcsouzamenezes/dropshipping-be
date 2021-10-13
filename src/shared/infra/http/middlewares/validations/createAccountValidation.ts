import { NextFunction, Request, Response } from 'express'
import { check, validationResult } from 'express-validator'

const createAccountValidation = [
  check('company')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Name is required'),
  check('name').trim().escape().not().isEmpty().withMessage('Name is required'),
  check('email')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Name is required')
    .isEmail()
    .withMessage('Invalid email'),
  check('password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
    .withMessage(
      'Email must contain at least 8 characters, one uppercase, one lowercase, one number and one special character'
    ),
  check('type')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Type is required')
    .isIn(['supplier', 'seller'])
    .withMessage("Type must be either 'seller' or 'supplier'"),
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

export { createAccountValidation }
