const mongoose = require('mongoose')
const path = require('path')
const coverImageBasePath = 'uploads/bookCovers' //ton store books

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  publishDate: {
    type: Date,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  },
  createdAt: { //to show recently added books in order 
    type: Date,
    required: true,
    default: Date.now
  },
  coverImage: {
    type: Buffer,
    required: true
  },
  coverImageType: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,//use to reference the author Object
    required: true,
    ref: 'Author'
  }
})

bookSchema.virtual('coverImagepath').get(function(){

  if (this.coverImageName != null) {
      return path.join('/', coverImageBasePath, this.coverImageName)
  }
})  //used to creat virtual propertty that will derive value from varaibles

module.exports = mongoose.model('Book', bookSchema)
module.exports.coverImageBasePath = coverImagebasePath