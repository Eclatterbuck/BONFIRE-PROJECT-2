const express = require('express')
const Book = require('../models/book')
const router = express.Router()
const Author = require('../models/author')

//USED TO GET ALL AUTHORS

//due to get we must query to access our parameters
//allowing names to be passed to server
//RegExp is Regular Expression and Search Options sends requests back to the user so we can get everything we want


//END EXAMPLE OF WHAT IT SHOULD BE

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
      author = Author.findById(req.params.id)
      const newAuthor = await author.save()
      res.redirect(`authors/${newAuthor.id}`)
    } catch {
      res.render('authors/new', {
        author: author,
        errorMessage: 'Error creating Author'
      })
    }
  })

  // router.get('/:id', async (req, res) => {
  //     try {
    // const author = await Author.findById(req.params.id)
    // const books = await Book.find({ author: author.id }). limit(7). exec()// limit to 7 books shown
    //   res.render('authors/show', {
    //     authos: author,
    //     booksByAuthor: books

    //   })
    //   } catch (err) {
      //console.log(err)
        // res.redirect('/')
 // }
  //  })

  
  // routher.get('/:id/edit', async (req, res) => {
  //       try {
    //       const author = await Author.findById(req.params.id)
    //       res.render('authors/edit', {author: author})
    //     } catch {
    //      res.redirect('/authors')
    //     }
    //     })
  // })

  
  
  //  router.put('/:id', async(req, res) => {
  //   let author
  //   try {
  //    author = await Author.findById(req.params.id)
  //    author.name = req.body.name
  //     await author.save()
  //    res.redirect('/authors/${author.id}')
  //   } catch {
  //         if (author == null) {
  //           res.redirect('/')
  //         } else {
  //         res.render('authors/edit', {
  //     author:author,
  //     errorMessage: 'Error creating Author'
  //         })
  //   })
  // }
  // })

  // router.delete('/:id', async (req,res) => {
  // let author
  //   try {
  //    author = await Author.findById(req.params.id)
  //    author.name = req.body.name
  //     await author.remove()
  //    res.redirect('/authors')
  //   } catch {
  //         if (author == null) {
  //           res.redirect('/')
  //         } else {
  //         res.redirect(`/authors/${author.id}`)
  //   }
  // }
  // })


module.exports = router //hooking up route to server