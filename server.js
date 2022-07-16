require('dotenv').config()

const shutdownMessage = '💥💥💥 Shutting down...'

// handle uncaught exceptions
process.on('uncaughtException', err => {
  console.log(`UNCAUGHT EXCEPTION! ${shutdownMessage}`)
  console.log(err.name, err.message)
  process.exit(1)
})

const app = require('./app')
const port = process.env.PORT || 3000

const server = app.listen(port, () => {
  console.log(`app is running in ${process.env.NODE_ENV} on port ${port}`)
})

// handle unhandled promise rejections
process.on('unhandledRejection', err => {
  console.log(`UNHANDLED REJECTION! ${shutdownMessage}`)
  console.log(err.name, err.message)
  // gracefully shutdown server
  server.close(() => {
    process.exit(1)
  })
})

process.on('SIGTERM', () => {
  console.log(`SIGTERM RECEIVED! ${shutdownMessage}`)
  // gracefully shutdown server
  server.close(() => {
    console.log('Process terminated.')
  })
})
