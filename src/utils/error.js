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
  constructor(message, status) {
    super(message)
    this.name = this.constructor.name
    this.status = status
  }
}

HTTPError.BAD_REQUEST = new HTTPError('Bad Request', 400)
HTTPError.UNAUTHORIZED = new HTTPError('Unauthorized', 401)
HTTPError.FORBIDDEN = new HTTPError('Forbidden', 403)
HTTPError.NOT_FOUND = new HTTPError('Not Found', 404)
HTTPError.ValidationError = new HTTPError('ValidationError', 400)

module.exports = {
  ValidationError,
  HTTPError,
}
