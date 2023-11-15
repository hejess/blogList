const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        'title': 'Alo',
        'author': 'Melbourne',
        'url': 'test.com',
        'likes': 3
    },
    {
        'title': 'Kiki is a cat',
        'author': 'Me Hotel',
        'url': 'test.com',
        'likes': 99
    }
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

const getBlogById = async (id) => {
    const blog = await Blog.findById(id)
    return blog
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDB,
    getBlogById,
    usersInDB
}