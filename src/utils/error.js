/**
 *
 */
class ValidationError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ValidationError'
    if (status) {
      this.status = status
    }
  }
}

class HTTPError extends Error {
  constructor(status, message) {
    super(message)
    this.name = this.constructor.name
    this.status = status
  }
}

HTTPError.UNAUTHORIZED = new HTTPError(401, 'Unauthorized')
HTTPError.NOT_FOUND = new HTTPError(404, 'Not Found')

module.exports = {
  ValidationError,
  HTTPError,
}
