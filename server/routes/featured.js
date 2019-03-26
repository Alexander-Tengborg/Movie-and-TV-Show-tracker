const express = require('express');
const movieRouter = express.Router();
const axios = require('axios');

//Have to fix the refresh buttons,
//Or however I am going to populate/refresh this.
movieRouter.get('/all', (req, res) => {
    let url = null
    axios.get(url)
        .then((response) => {
            console.log(req.query);
            return res.json(response.data);
        })
});

module.exports = movieRouter;