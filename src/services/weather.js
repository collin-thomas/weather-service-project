const axios = require('../utils/axios')

const OpenWeatherApi = axios.create({
  baseURL: process.env.OPEN_WEATHER_API_URL || 'https://api.openweathermap.org/data/2.5',
})

// Use Fahrenheit on all requests
OpenWeatherApi.interceptors.request.use(
  (config) => {
    config.params.units = 'imperial'
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

// Hot, Moderate, Cold
const feels = (temp) => {
  if (temp >= 80) {
    return 'Hot'
  }
  if (temp >= 60) {
    return 'Moderate'
  } else {
    return 'Cold'
  }
}

const get = async ({ lat, lon, api_key }) => {
  const res = await OpenWeatherApi.get('/onecall', {
    params: { lat, lon, appid: api_key, exclude: 'minutely,hourly,daily' },
  })
  if (!res.success) {
    throw res.error
  }
  // there can be multiple conditions, first is primary.
  // https://openweathermap.org/weather-conditions
  const conditions = res.data.current.weather.map((weather) => weather.main)
  const temperature = feels(res.data.current.temp)
  let alerts
  if (res.data.alerts) {
    // return any alerts event and description
    alerts = res.data.alerts.map((alert) =>
      (({ event, description }) => ({ event, description }))(alert),
    )
  }
  return {
    conditions,
    primary_condition: conditions[0],
    temperature,
    alerts,
  }
}

module.exports = {
  get,
  feels,
  OpenWeatherApi,
}
