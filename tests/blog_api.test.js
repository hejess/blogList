const mongoose = require('mongoose')
const supertest = require('supertest')
const test_helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(test_helper.initialBlogs)
})


test('Blogs are returned as JSON and have the correct length', async () => {
    const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(test_helper.initialBlogs.length)
})

test('Unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('HTTP POST request to /api/blogs', async () => {
    const newBlog = {
        title: 'Do not go gentle into the dark night',
        author: 'Donno',
        url: 'test.com',
        likes: 8
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(b => b.title)
    expect(response.body).toHaveLength(test_helper.initialBlogs.length + 1)
    expect(titles).toContain(newBlog.title)
},)

test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
        title: 'Sign of the Times',
        author: 'Harry Styles',
        url: 'test.com'
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const blog = response.body.find(b => b.title === newBlog.title)
    expect(blog.likes).toBeDefined()
    expect(blog.likes).toBe(0)
})

test('if the title or url properties are missing from the request data, 400 Bad Request', async () => {
    const newBlog = {
        title: 'Sign of the Times',
        author: 'Harry Styles',
        likes: 1
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

afterAll(async () => {
    await mongoose.connection.close()
})
