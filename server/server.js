const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const helmet = require('helmet');

const config = require('./db');
require('./passport')(passport); //fix name

const app = express();

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()) //json
app.use(helmet());
app.use(express.static(path.join(__dirname, 'build'))); // build directory
app.use(passport.initialize());

//HTML CHARS?
//SQL INJECTION

//The website keeps running normally if mongoose fails to connect to the database.
//So, the client does not recieve any errors or any other response, 
//meaning that they can keep pressing a button a lot of times without anything happening / any response

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {
        console.log('Connected to the database.');
    },
    (err) => {
        console.log('Could not connect to the database!\n' + err);
    }
)

mongoose.set('useCreateIndex', true); //The unique property does not work, so i either have to check them myself or use the library mongoose-unique-validator

const apiRoute = require('./routes/api');

app.use('/api/', apiRoute);

// app.get('/api/', (req, res) => { //fix so it works for /api aswell.
//     res.send('Home Page');
// })

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })

const PORT = process.env.PORT || 5000;

app.listen(PORT);