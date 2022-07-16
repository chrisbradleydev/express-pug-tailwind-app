const path = require('path')
const express = require('express')
const viewRouter = require('./routes/viewRoutes')

const app = express()

// set view engine
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// serve static files
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/', viewRouter)

// handle unknown routes
app.all('*', (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on this server!`, 404))
})

module.exports = app
