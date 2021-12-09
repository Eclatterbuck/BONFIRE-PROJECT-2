const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//USED TO GET ALL AUTHORS

//due to get we must query to access our parameters
//allowing names to be passed to server
//RegExp is Regular Expression and Search Options sends requests back to the user so we can get everything we want

router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const authors = await Author.find(searchOptions)
    res.render('authors/index', {
      authors: authors,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

// New Author Route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
  })


  //CREATE Author Route //Goofled Async fucntion for promise based behavior
  router.post('/', async (req, res) => {
    const author = new Author({
      name: req.body.name
    })
    try {
      const newAuthor = await author.save()
      res.redirect(`authors/${newAuthor.id}`)
    } catch {
      res.render('authors/new', {
        author: author,
        errorMessage: 'Error creating Author'
      })
    }
  })

module.exports = router //hooking up route to server