const router = require('express').Router()
const asyncWrap = require('../utils/asyncWrap')
const Weather = require('../services/weather')
const WeatherValidation = require('../validators/weather')
const { ValidationError } = require('../utils/error')
const { requiresApiKey } = require('../middleware/auth')

router.get(
  '/',
  requiresApiKey,
  asyncWrap(async (req, res) => {
    const valid = WeatherValidation.get(req.query)
    if (!valid) {
      throw new ValidationError('Invalid or Missing Coordinates', 400)
    }
    const weather = await Weather.get(req.query)
    res.json(weather)
  }),
)

module.exports = router
