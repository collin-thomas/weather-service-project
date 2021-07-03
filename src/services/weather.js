const axios = require('axios')

const OpenWeatherApi = axios.create({
  baseURL: process.env.OPEN_WEATHER_API_URL || 'https://api.openweathermap.org/data/2.5',
})

module.exports.get = async ({ lat, lon, api_key }) => {
  const res = await OpenWeatherApi.get(
    `/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${api_key}`,
  )
  // check res, etc
  return res.data
}
