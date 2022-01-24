import { Request, Response, NextFunction } from 'express'
import { validationResult, query } from 'express-validator'

export const updateFilesValidation = [
  // query('id').trim().escape().not().isEmpty().withMessage('Id is required'),
  (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(422).json({
        error: true,
        errors: errors.array(),
        code: 'update_files:invalid_data',
      })
    }

    return next()
  },
]
