const errorHandler = async (err, req, res, next) => {
  const status =
    err.status || err.statusCode || (err.response && err.response.status ? err.response.status : 500)
  let error
  if (typeof err === 'string') {
    error = { message: err }
  } else if (typeof err === 'object') {
    error = {}
    let keys = ['message', 'name']
    keys.forEach((key) => {
      if (key in err) {
        error[key] = err[key]
      }
    })
  } else {
    error = err
  }
  // log error
  if (process.env.VERBOSE === 'true') {
    console.error('Error:', error)
  }
  res.status(status).json(error)
}

module.exports = errorHandler
