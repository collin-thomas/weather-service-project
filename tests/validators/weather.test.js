const ValidateWeather = require('../../src/validators/weather')

describe('ValidateWeather.get', () => {
  test('With correct values', () => {
    const valid = ValidateWeather.get({ lat: '33.44', lon: '-94.04' })
    expect(valid).toBe(true)
  })

  test('Without correct values', () => {
    expect(ValidateWeather.get({ lat: '33.44', wrong: '-94.04' })).toBe(false)
    expect(ValidateWeather.get({ lat: '33.44' })).toBe(false)
    expect(ValidateWeather.get()).toBe(false)
  })
})
