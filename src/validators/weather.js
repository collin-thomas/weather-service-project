/**
 * Validates request for Weather.get()
 * @param {Object} query req.query from express
 * @returns {boolean}
 */
module.exports.get = (query) => {
  /* 
  Expecting
  query.lat
  query.lon
  query.api_key  
  */
  if (!query) return false
  const queryParams = ['lat', 'lon']
  const queryKeys = Object.keys(query)
  return queryParams.every((param) => queryKeys.includes(param))
}
