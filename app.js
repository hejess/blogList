const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

const morgan = require('morgan')
morgan.token('data', req => req.method === 'POST'? JSON.stringify(req.body) : '')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))



logger.info('Connecting to MongoDB')
logger.info(config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDB')
    })
    .catch(error => {
        logger.info('Error connecting to MongoDB: ', error.message)
    })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter) //router is a middleware

module.exports = app