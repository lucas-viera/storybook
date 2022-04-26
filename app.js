const express = require('express');
const dotenv = require('dotenv');
const connectDB = require ('./config/db');
const morgan = require ('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const session = require('express-session');


dotenv.config({ path: './config/config.env' });

// Passport config
require('./config/passport')(passport)
//DB Connection
connectDB();

const app = express();

//Logging
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//Handlebars
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', '.hbs');

// Session mw
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
    //store:
}));

//Passport mw
app.use(passport.initialize());
app.use(passport.session());

//Static folder
app.use(express.static(path.join(__dirname,'public')));

//Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5555
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}` )
);