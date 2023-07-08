const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const { globalErrorHandler } = require('./controllers/error.controller')
const { AppError } = require('./utils/appError.util')
const { filmRouter } = require('./routes/films.routes')



const app = express()

app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
else app.use(morgan('combined'))

app.use('/api/v1/films', filmRouter)

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `${req.method} ${req.originalUrl} not found in this server`,
      404
    )
  )
})
app.use(globalErrorHandler)

module.exports = { app }
