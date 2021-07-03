/**
 * Wrapper for express routes to use async handlers and catch errors
 * @param {Function} fn - Async route handler
 */
module.exports = fn => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
