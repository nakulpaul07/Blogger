const express = require('express')
const app = express()
const port = 2100

const web = require('./route/web')

// connect data base
const connectDbs = require('./db/connectDb')

// connectdb function connectDbs
connectDbs()

// connect flash and session 
const session = require('express-session')
const flash = require('connect-flash')

// message

app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));

// flash message
app.use(flash())



// html css views

app.set('view engine', 'ejs')

//html css link public
app.use(express.static('public'))


// convert language for database
app.use(express.urlencoded({ extended: false }))

// fileuploader for image
const fileuploader = require('express-fileupload')

const cookieParse = require('cookie-parser')

// token gET
app.use(cookieParse());


// call function of fileuploader
app.use(fileuploader({ useTempFiles: true }))

//routes load (Always On bottom)
app.use('/', web)

app.listen(port, () => { console.log("Localhost:2100") })