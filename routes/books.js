const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs') //file system
const path = require('path')
const Book = require('../models/book')
const Author = require('../models/author')
const uploadPath = path.join('public', Book.coverImagebasePath)
const imageMimetypes = ['images/jpeg', 'images/png']
const upload = multer({
  dest: uploadPath
  fileFilter: (req, file, callback) => {
    callback(null, )
  }  //Filters which file the server accepts.

})

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
router.post('/', upload.single('cover'), async (req, res) => {
  req.file != null ? req.file.filename : null
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate), //convert string to date using a new function we can store
    pageCount: req.body.pageCount,
    description: req.body.description
})

try {
  const newBook = await book.save()
  res.redirect(`books`)
} catch {
  if (book.coverImageName != null {
  removeBookCover(book.coverImageName)
  renderNewpage(res, book, true)

}

})

function removebookCover(fileName) {
  fs.unlink(path.join(uploadPath, fileName), err +> {
    if (err) console.error(err)
  })
}

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



module.exports = router