const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require ('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require ('./config/db');

dotenv.config({ path: './config/config.env' });

// Passport config
require('./config/passport')(passport)
//DB Connection
connectDB();

const app = express();

//Body parser
app.use(express.urlencoded({ extended: false}));
app.use(express.json()); 

//Logging
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Handlebars Helpers
const { formatDate } = require('./helpers/hbs');

//Handlebars
app.engine(
    '.hbs', 
    exphbs.engine({ 
        helpers: {
            formatDate,
        },
        extname: '.hbs', 
        defaultLayout: "main"
    })
);
app.set('view engine', '.hbs');

// Session mw
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI,}),
    }
));

//Passport mw
app.use(passport.initialize());
app.use(passport.session());

//Static folder
app.use(express.static(path.join(__dirname,'public')));

//Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

const PORT = process.env.PORT || 5555;
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}` )
);