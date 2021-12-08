
   
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load()
  }

//              DEPENDENCIES

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const indexRouter = require('./routes/index') //relative to where route is

//SETTING VIEW ENGINE

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views') //append to a specific directory

app.set('layout', 'layouts/layout')// to not duplicate beginning and end HTML
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected Mongoose'))



//ROUTES USED

app.use('/', indexRouter) //to get to main root



//                  LISTENERs

app.listen(process.env.PORT || 3000)
