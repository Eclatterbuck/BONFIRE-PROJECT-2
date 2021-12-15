
// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').load()
//   }
  

//              DEPENDENCIES

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

const indexRouter = require('./routes/index') //relative to where route is
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')




//SETTING VIEW ENGINE

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views') //append to a specific directory

app.set('layout', 'layouts/layout')// to not duplicate beginning and end HTML
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))//store Javascript

// configure settings
require('dotenv').config();

// connect to and configure mongoDB with mongoose

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

// set up mongodb event listeners
db.on('connected', () => console.log('Connected to MongoDB'));
db.on('error', (err) => console.log('MongoDB Error: ' + err.message));


//ROUTES USED

app.use('/', indexRouter) //to get to main root
app.use('/authors', authorRouter)//getting to author root
app.use('/books', bookRouter)// getting to book route



//                  LISTENERs
const PORT = process.env.PORT; 

app.listen(PORT, () => {
    console.log('Express is listening on port: ' + PORT);
});