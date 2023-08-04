const express = require('express')
const app = express()
const port = 3000
const web = require('./routes/web')
const { connect } = require('mongoose')
const connectDB = require('./db/connectdb')
const session = require('express-session')
const flash = require('connect-flash');
app.set('view engine','ejs')
const cookieParser =require('cookie-parser')

//connect DB
connectDB()

//To run static files
app.use(express.static('public'))


//use for get the token frombrowser
app.use(cookieParser())

//this is use to get data
app.use(express.urlencoded({extended:false}))



//for flesh Message
app.use(session({
        secret: 'secret',
        cookie: { maxAge: 60000 },
        resave: false,
        saveUninitialized: false,
        
      }));
app.use(flash());



//routes localhost:3000
app.use('/',web)

app.listen(port,() =>{
    console.log(`example app listening on port ${port}`)
})