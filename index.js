const config = require('./utils/config')
const logger = require('./utils/logger')

const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter) //router is a middleware

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})