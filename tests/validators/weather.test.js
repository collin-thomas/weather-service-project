const WeatherValidation = require('../../src/validators/weather')

describe('WeatherValidation.get', () => {
  test('With correct values', () => {
    expect(WeatherValidation.get({ lat: '33.44', lon: '-94.04' })).toBe(true)
  })

  test('Without correct values', () => {
    expect(WeatherValidation.get({ lat: '33.44', wrong: '-94.04' })).toBe(false)
    expect(WeatherValidation.get({ lat: '33.44' })).toBe(false)
    expect(WeatherValidation.get()).toBe(false)
    expect(WeatherValidation.get({ lat: 'string', lon: '-94.04' })).toBe(false)
  })
})
