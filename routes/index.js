const express = require('express')
const router = express.Router()
const BOOK = REQUIRE('../models/books')


router.get('/', (req, res) => {
    let books
    try {
        books = await Book.find().sort({ createdAt: 'desc'}).limit(10).exec() //code to limit to 10 books at a time
    } catch {
        books = []
    }
    res.render('index', {books: books }) //passing books to book variable
})


module.exports = router //hooking up route to server