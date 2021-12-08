const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//USED TO GET ALL AUTHORS

router.get('/', async (req, res) => {
  
    const authors = await Author.find()
    res.render('authors/index', {
      authors: authors,
      
    })
  
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