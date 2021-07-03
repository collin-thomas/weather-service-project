const Weather = require('../../src/services/weather')
const API_KEY = process.env.OPEN_WEATHER_API_KEY
describe('Weather.get', () => {
  // probably should mock this
  test('', async () => {
    const valid = await Weather.get({ lat: '33.44', lon: '-94.04', api_key: API_KEY })
    console.log(valid)
  })
})
