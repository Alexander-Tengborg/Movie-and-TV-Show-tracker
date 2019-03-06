const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const config = require('./db');

const app = express();

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {
        console.log('Connected to the database.');
    },
    (err) => {
        console.log('Could not connect to the database!\n' + err);
    }
)

mongoose.set('useCreateIndex', true); //The unique property does not work, so i either have to check them myself or use the library mongoose-unique-validator


app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()) //json
app.use(express.static(path.join(__dirname, 'build'))); // build directory

app.get('/api/*', (req, res) => { //fix so it works for /api aswell.
    res.send('Home Page');
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const PORT = process.env.PORT || 5000;

app.listen(PORT);