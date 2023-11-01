const config = require('../utils/config')
const logger = require('../utils/logger')
const mongoose = require('mongoose')
mongoose.connect(config.MONGODB_URI)
    .then(result => {
        logger.info('Connected to MongoDB')
    })
    .catch(error => {
        logger.info('Error connecting to MongoDB: ', error.message)
    })
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})
// It's used to configure how the data from MongoDB documents (Mongoose models)
// should be transformed when converted to JSON format. 
// This transformation can be helpful, for example,
// when you want to remove or rename certain properties.
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog