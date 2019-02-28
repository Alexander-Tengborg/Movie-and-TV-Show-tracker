const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/*', (req, res) => { //fix so it works for /api aswell.
    res.send('Home Page');
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const PORT = process.env.PORT || 5000;

app.listen(PORT);