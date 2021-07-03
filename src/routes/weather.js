const router = require('express').Router()
const asyncWrap = require('../utils/asyncWrap')
const Weather = require('../services/weather')
const ValidateWeather = require('../validators/weather')
const { ValidationError } = require('../utils/error')

router.get(
  '/',
  asyncWrap(async (req, res) => {
    const valid = ValidateWeather.get(req.query)
    if (!valid) {
      throw new ValidationError('Workflow not found', 400)
    }
    const weather = await Weather.get(req.query)
    res.success(weather)
  }),
)
