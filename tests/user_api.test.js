const bcrypt = require('bcrypt')
const User = require('../models/user')
const test_helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('password', 10)
        const user = new User({
            username: 'root',
            passwordHash: passwordHash
        })
        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await test_helper.usersInDB()
        const newUser = {
            username: 'testUser',
            name: 'John Doe',
            password: '123456'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await test_helper.usersInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode (400) and message if username already taken', async () => {
        const usersAtStart = await test_helper.usersInDB()
        const newUser = {
            username: 'root',
            name: 'John Doe',
            password: '123456'
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('expected `username` to be unique')

        const usersAtEnd = await test_helper.usersInDB()
        expect(usersAtEnd).toEqual(usersAtStart)
    })
})

describe('min length of username and password', () => {
    test('creation fails with proper statuscode (400) and message if username is too short', async () => {
        const usersAtStart = await test_helper.usersInDB()
        const newUser = {
            username: 'aa',
            name: 'John Doe',
            password: '123456'
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('username must be at least 3 characters long')
        const usersAtEnd = await test_helper.usersInDB()
        expect(usersAtEnd).toEqual(usersAtStart)
    })
    test('creation fails with proper statuscode (400) and message if password is too short', async () => {
        const usersAtStart = await test_helper.usersInDB()
        const newUser = {
            username: 'kiki2023',
            name: 'John Doe',
            password: '12'
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('password must be at least 3 characters long')
        const usersAtEnd = await test_helper.usersInDB()
        expect(usersAtEnd).toEqual(usersAtStart)
    })
})