module.exports.errorHandler = async (err, req, res) => {
  console.error('errorHandler', err)
  let error
  const status = res.statusCode || err.status || 500
  if (err.message) {
    Object.defineProperty(err, 'message', { enumerable: true })
  }
  if (err.stack) {
    Object.defineProperty(err, 'stack', { enumerable: true })
  }
  if (typeof err === 'string') {
    error = { message: err }
  } else {
    error = err
  }
  res.status(status)
  res.json(error)
}
