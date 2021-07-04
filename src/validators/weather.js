/**
 * Validates request for Weather.get()
 * Is lat and lon specified and are they float/int
 * @param {Object} query req.query from express
 * @returns {boolean}
 */
module.exports.get = (query) => {
  if (!query) return false
  const queryParams = ['lat', 'lon']
  const queryKeys = Object.keys(query)
  return queryParams.every((param) => queryKeys.includes(param) && !isNaN(parseFloat(query[param])))
}
