const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
//const uploadfotos = require('./server/database/configMulter')

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config( { path: 'config.env'} )
const PORT = process.env.PORT || 8080

//log requests
app.use(morgan ('tiny'));

// mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true}));

//setar view engine
app.set("view engine", "ejs")

var session = require('express-session')
const passport = require('passport')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    })
)

app.use(passport.authenticate('session'));

//carregar assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))
app.use('/font', express.static(path.resolve(__dirname, "assets/font")))

//carregar router
app.use('/', require('./server/routes/router'))

app.listen(PORT, () => {console.log (`Servidor conectado em http://localhost:${PORT}`)});