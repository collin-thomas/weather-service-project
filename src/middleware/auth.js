const { HTTPError } = require('../utils/error')

const requiresApiKey = (req, res, next) => {
  if (!req.query) return next(HTTPError.UNAUTHORIZED)
  if (!('api_key' in req.query)) return next(HTTPError.UNAUTHORIZED)
  if (!req.query.api_key.length) return next(HTTPError.UNAUTHORIZED)
  req.api_key = req.query.api_key
  next()
}

module.exports = { requiresApiKey }
