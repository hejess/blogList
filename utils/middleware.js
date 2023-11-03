const morgan = require('morgan')
morgan.token('data', req => req.method === 'POST'? JSON.stringify(req.body) : '')
const morganLogging = morgan(':method :url :status :res[content-length] - :response-time ms :data')

const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
        response.status(400).json({ error: error.message })
    } else if (error.name === 'CastError') {
        response.status(400).json({ error: 'invalid blog id' })
    }
    next(error)
}

module.exports = { morganLogging, errorHandler }