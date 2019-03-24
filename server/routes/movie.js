const express = require('express');
const movieRouter = express.Router();
const axios = require('axios');

movieRouter.get('/search', (req, res) => {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=e7c932bbbb81168a709224970c15e1a7&query=${req.query.query}&page=${req.query.page}`;
    axios.get(url)
        .then((response) => {
            console.log(req.query);
            return res.json(response.data);
        })
});

movieRouter.get('/getById', (req, res) => {
    let url = `https://api.themoviedb.org/3/movie/${req.query.id}?api_key=e7c932bbbb81168a709224970c15e1a7&append_to_response=credits`;
    axios.get(url)
        .then((response) => {
            console.log(req.query);
            return res.json(response.data);
        })
});

module.exports = movieRouter;