const middleware = require('./utils/middleware')
const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const mongoose = require('mongoose')

logger.info('Connecting to MongoDB')
logger.info(config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDB')
    })
    .catch(error => {
        logger.info('Error connecting to MongoDB: ', error.message)
    })

app.use(middleware.morganLogging)
app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter) //router is a middleware
app.use('/api/users', usersRouter)
app.use(middleware.errorHandler)

module.exports = app