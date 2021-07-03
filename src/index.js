require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
const express = require('express')
const cors = require('cors')
const errorHandler = require('/utils/errorHandler')
const routes = require('/routes')

// env vars
const EXPRESS_HOST = process.env.EXPRESS_HOST || '0.0.0.0'
const EXPRESS_PORT = process.env.EXPRESS_PORT || 3000

// setup express
const app = express()
app.use(express.json())
app.use(cors())

// routes
app.use('/', routes)

// must be after all routes
app.use(errorHandler)

// start server
app.listen(EXPRESS_PORT, EXPRESS_HOST, () => {
  console.log(`API listening at http://${EXPRESS_HOST}:${EXPRESS_PORT}`)
})

process
  .on('uncaughtException', function (error) {
    console.error(
      `${new Date().toUTCString()} | uncaughtException | ${error.message ? error.message : error}`,
    )
    console.error(error.stack ? error.stack : error)
    process.exit(1)
  })
  .on('unhandledRejection', (error) => {
    console.error(
      `${new Date().toUTCString()} | unhandledRejection | ${error.message ? error.message : error}`,
    )
    console.error(error.stack ? error.stack : error)
    process.exit(1)
  })
