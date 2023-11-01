const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

logger.info('Connecting to MongoDB')

mongoose.connect(config.MONGODB_URI)
    .then(result => {
        logger.info('Connected to MongoDB')
    })
    .catch(error => {
        logger.info('Error connecting to MongoDB: ', error.message)
    })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter) //router is a middleware

module.exports = app