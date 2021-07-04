const Weather = require('../../src/services/weather')
const API_KEY = process.env.OPEN_WEATHER_API_KEY

describe('Weather.get', () => {
  test('Returns correct response', async () => {
    const mockData = {
      lat: 51.9837,
      lon: 5.55,
      timezone: 'Europe/Amsterdam',
      timezone_offset: 7200,
      current: {
        dt: 1625420899,
        sunrise: 1625369069,
        sunset: 1625428776,
        temp: 63.57,
        feels_like: 63.95,
        pressure: 1009,
        humidity: 92,
        dew_point: 61.21,
        uvi: 0.33,
        clouds: 100,
        visibility: 10000,
        wind_speed: 1.57,
        wind_deg: 284,
        wind_gust: 2.19,
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d',
          },
        ],
      },
      alerts: [
        {
          sender_name: 'KNMI Koninklijk Nederlands Meteorologisch Instituut',
          event: 'Moderate thunderstorm warning',
          start: 1625410800,
          end: 1625421600,
          description:
            'Thunderstorms.\nPossibly with hail, windgusts an abundant rain.\nBE AWARE that thunderstorms may occur.\n Take extra care in exposed areas, like mountains, forest and open terrain.\nDisruption to outdoor activities is possible.',
          tags: ['Thunderstorm'],
        },
      ],
    }
    const expectedResponse = {
      conditions: ['Clouds'],
      primary_condition: 'Clouds',
      temperature: 'Moderate',
      alerts: [
        {
          event: 'Moderate thunderstorm warning',
          description:
            'Thunderstorms.\nPossibly with hail, windgusts an abundant rain.\nBE AWARE that thunderstorms may occur.\n Take extra care in exposed areas, like mountains, forest and open terrain.\nDisruption to outdoor activities is possible.',
        },
      ],
    }
    jest.spyOn(Weather.OpenWeatherApi, 'get').mockImplementation(() => {
      return {
        success: true,
        data: mockData,
      }
    })
    // doesn't matter what we pass in as long as it is valid, testing the data processing
    const res = await Weather.get({ lat: '55.00', lon: '55.00', api_key: API_KEY })
    expect(res).toStrictEqual(expectedResponse)
  })
})

describe('Weather.feels', () => {
  test('Hot', () => {
    expect(Weather.feels(80)).toBe('Hot')
    expect(Weather.feels(81)).toBe('Hot')
    expect(Weather.feels(80.01)).toBe('Hot')
  })
  test('Moderate', () => {
    expect(Weather.feels(79)).toBe('Moderate')
    expect(Weather.feels(60)).toBe('Moderate')
    expect(Weather.feels(60.01)).toBe('Moderate')
  })
  test('Cold', () => {
    expect(Weather.feels(59)).toBe('Cold')
    expect(Weather.feels(-10)).toBe('Cold')
    expect(Weather.feels(-10.01)).toBe('Cold')
  })
})
