const { getMockReq, getMockRes } = require('@jest-mock/express')
const { requiresApiKey } = require('../../src/middleware/auth')
const { HTTPError } = require('../../src/utils/error')
const API_KEY = process.env.OPEN_WEATHER_API_KEY || 'mock-key'

describe('requiresApiKey', () => {
  const { res, next, clearMockRes } = getMockRes({
    locals: { requiresApiKey },
  })

  beforeEach(() => {
    clearMockRes()
  })

  test('Request with key', async () => {
    let req
    req = getMockReq({ query: { api_key: API_KEY } })
    await requiresApiKey(req, res, next)
    expect(req.api_key).toBe(API_KEY)
    expect(next).toBeCalledWith()
  })

  test('Request without key', async () => {
    let req
    req = getMockReq({ query: {} })
    await requiresApiKey(req, res, next)
    expect(next).toBeCalledWith(HTTPError.UNAUTHORIZED)

    req = getMockReq({ query: { api_key: '' } })
    await requiresApiKey(req, res, next)
    expect(next).toBeCalledWith(HTTPError.UNAUTHORIZED)
  })
})
