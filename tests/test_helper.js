const Blog = require('../models/blog')

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


module.exports = { initialBlogs, blogsInDB, getBlogById }