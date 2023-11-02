const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Blog title required']
    },
    author: String,
    url: {
        type: String,
        required: [true, 'Blog url required']
    },
    likes: {
        type: Number,
        default: 0
    }
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