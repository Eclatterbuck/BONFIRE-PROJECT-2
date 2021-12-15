const mongoose = require('mongoose')
const path = require('path')


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
    type: Buffer, //data representing entire image
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

bookSchema.virtual('coverImagePath').get(function() {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
  }
}) //used to creat virtual propertty that will derive value from varaibles. used as source of image. BASe 64 used to encode

module.exports = mongoose.model('Book', bookSchema)
