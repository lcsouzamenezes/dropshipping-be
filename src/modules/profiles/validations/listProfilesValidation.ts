import { Request, Response, NextFunction } from 'express'
import { validationResult, query } from 'express-validator'

export const listProfilesValidation = [
  query('only_main')
    .trim()
    .escape()
    .optional()
    .isBoolean()
    .withMessage('Only main must be boolean'),
  (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(422).json({
        error: true,
        errors: errors.array(),
        code: 'list_profiles:invalid_data',
      })
    }

    return next()
  },
]
