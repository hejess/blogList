const morgan = require('morgan')
morgan.token('data', req => req.method === 'POST'? JSON.stringify(req.body) : '')
const morganLogging = morgan(':method :url :status :res[content-length] - :response-time ms :data')

const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
        response.status(400).json({ error: error.message })
    }
    next(error)
}

module.exports = { morganLogging, errorHandler }