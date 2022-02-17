const { check, validationResult } = require("express-validator")

const validateCreateMovie = [
  check("title").isLength({ min:1 }).isString(),
  check("date").isDate( {format: 'YYYY-MM-DD'} ),
  //check("rating").isLength({ min:1 }).isNumeric(),
  check("description").isLength({ min:1 }).isString(),
  check("email").isEmail(),
  check("imgURL").isLength({ min:1 }).isString(),
  (req, res, next) => {
    const result = validationResult(req, res, next)
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() })
    } else {
      return next()
    }
  },
]

module.exports = { validateCreateMovie }