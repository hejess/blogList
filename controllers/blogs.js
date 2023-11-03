// A router object is an isolated instance of middleware and routes.
// You can think of it as a “mini-application,”
// capable only of performing middleware and routing functions.
// Every Express application has a built-in app router.
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => {
            next(error)
        })
})

blogsRouter.delete('/:id', (request, response, next) => {
    const id = request.params.id
    Blog
        .findByIdAndDelete(id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => {
            next(error)
        })
})

blogsRouter.put('/:id', (request, response, next) => {
    const id = request.params.id
    const body = request.body
    const newBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    Blog
        .findByIdAndUpdate(id, newBlog,  { new: true })
        .then(updatedNote => {
            response.status(200).json(updatedNote)
        })
        .catch(error =>
            next(error))
})

module.exports = blogsRouter