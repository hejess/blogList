const dummy = () => 1

const totalLikes = (blogs) => {
    return blogs.reduce(
        (sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const result = blogs.reduce((favorite, blog) => blog.likes > favorite.likes ? blog : favorite, blogs[0])
    // Create a new object by destructuring the original object and excluding the specified properties
    const { __v, _id, url, ...newObject } = result
    return newObject
}
module.exports = {
    dummy, totalLikes, favoriteBlog
}