import { Request, Response, NextFunction } from 'express'
import { validationResult, body } from 'express-validator'

export const updateProfileValidation = [
  body('name')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Name is required')
    .not()
    .isUppercase()
    .withMessage('Name can not be in Uppercase'),
  body('nickname')
    .trim()
    .escape()
    .optional()
    .isString()
    .withMessage('Nickname must be a string'),
  body('is_company')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Is Company is required')
    .isBoolean()
    .withMessage('Is Company must be boolean'),
  body('document')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Document is required')
    .isNumeric()
    .withMessage('Document must be numeric'),
  body('state_subscription_number')
    .trim()
    .escape()
    .optional()
    .custom((value, { req }) => {
      if (req.body.is_company && !value) {
        throw new Error('State Subscription Number is required')
      }
      return true
    })
    .isNumeric()
    .withMessage('State Subscription Number must be numeric'),
  body('city_subscription_number')
    .trim()
    .escape()
    .optional()
    .isNumeric()
    .withMessage('City Subscription Number must be numeric'),
  body('zip')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Zip is required')
    .isNumeric()
    .withMessage('Zip must be numeric'),
  body('state')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('State is required'),
  body('city').trim().escape().not().isEmpty().withMessage('City is required'),
  body('district')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('District is required'),
  body('address')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Address is required'),
  body('number')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Number is required'),

  (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(422).json({
        error: true,
        errors: errors.array(),
        code: 'update_profile:invalid_data',
      })
    }

    return next()
  },
]
