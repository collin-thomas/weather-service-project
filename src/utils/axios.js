// Usage: const axios = require('utils/axios')
const axios = require('axios')
const axiosInherit = require('axios-inherit')
const { HTTPError } = require('./error')

// any instance of axios will inherit the interceptors in this file
axiosInherit(axios)

// returning success false with an error allows services to choose what to do,
// typically the service will throw the error and allow errorHandler middleware to respond
axios.interceptors.response.use(
  (response) => {
    return {
      success: true,
      data: response.data,
    }
  },
  async (error) => {
    return {
      success: false,
      error: new HTTPError(
        error.response.status,
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.response.statusText,
      ),
    }
  },
)

module.exports = axios
