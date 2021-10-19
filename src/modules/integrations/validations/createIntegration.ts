import { NextFunction, Request, Response } from 'express'
import { check, validationResult } from 'express-validator'

export const createIntegration = [
  check('description')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('description is required'),
  check('provider')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('type is required')
    .isIn(['mercadolivre', 'bling'])
    .withMessage('type error: available types are "mercadolivre", "bling"'),
  check('access_token')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('access_token is required'),
  check('refresh_token').trim().escape(),
  check('expires_at')
    .trim()
    .escape()
    .isInt()
    .withMessage('expires_at must be integer'),
  check('user_id').trim().escape(),
  (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(422).json({
        error: true,
        errors: errors.array(),
        code: 'create_integration:invalid_data',
      })
    }

    return next()
  },
]
