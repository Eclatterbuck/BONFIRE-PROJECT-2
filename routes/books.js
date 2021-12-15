const express = require('express')
const router = express.Router()

const fs = require('fs') //file system
const path = require('path')
const Book = require('../models/book')
const Author = require('../models/author')

const imageMimetypes = ['images/jpeg', 'images/png']


// All Books Route
router.get('/', async (req, res) => {
  let query = Book.find() //building query to execute later
  if (req.query.title) != null&& req.query.title != '') {
      query = query.regex('title', new RegExp(req.query.title, 'i'))

  }

  if (req.query.publishedBefore) != null&& req.query.publishedBefore != 
  '') {
    query = query.lte('publishedDate', req.query.publishedBefore) //lte meand less than or equal too

}

if (req.query.publishedAfter) != null&& req.query.publishedAfter != 
  '') {
    query = query.gte('publishedDate', req.query.publishedAfter) //gte means greater than or equal too

}

  try {
    const books = await query.exec() //to get results of executing fucntion
    res.render('books/index', {
      books: books,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

// New Book Route
router.get('/new', async (req, res) => {
  renderNewpage(res, new book())
    
  })

  //Creating new books

  // Create Book Route
router.post('/', async (req, res) => {
  req.file != null ? req.file.filename : null
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate), //convert string to date using a new function we can store
    pageCount: req.body.pageCount,
    description: req.body.description
})
saveCover(book, req.body.cover)

try {
  const newBook = await book.save()
  res.redirect(`books`)
} catch {
  if (book.coverImageName != null {
  removeBookCover(book.coverImageName)
  renderNewpage(res, book, true)

}

})



 async function renderNewpage(res, book, errorMessage = false) { //rendering  a New page for book and if selecting author fails it takes you back to book page.
  try {
    const authors = await Author.find({})
    const params = {
       authors: authors,
      book: book
    }
    if (errorMessage) params.errorMessage = 'Error Making Book'
    
    res.render('books/new', params) 
     
  } catch {
    res.redirect('/books')
  }
}

function saveCover(book, coverEncoded) {
  if (coverEncoded == null) return
  const cover = JSON.parse(coverEncoded) //parsing string as JSON
  if (cover != null && imageMimeTypes.includes(cover.type)) { //to confirm if javascript is bad we can return null to check image tyoe to ensure we have a valid cover
    book.coverImage = new Buffer.from(cover.data, 'base64') //to create a buffer inbetween set of data //learned about base64 data
    book.coverImageType = cover.type //converting back to image
  }
}


module.exports = router