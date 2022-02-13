const { check, validationResult } = require("express-validator")

const validateLogin = [
  check("email").isEmail(),
  check("password").isLength({ min: 6 }),
  (req, res, next) => {
    const result = validationResult(req, res, next)
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() })
    } else {
      return next()
    }
  },
]

const validateSignup = [
  check("firstName").isLength({ min: 1 }).isString(),
  check("lastName").isLength({ min: 1 }).isString(),
  check("birthday").isDate( {format: 'DD-MM-YYYY'} ),
  check("city").isLength({ min: 1 }).isString(),
  check("email").isEmail(),
  check("password").isLength({ min: 6 }),

  (req, res, next) => {
    const result = validationResult(req, res, next)
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() })
    } else {
      return next()
    }
  },
];

module.exports = { validateLogin, validateSignup }
