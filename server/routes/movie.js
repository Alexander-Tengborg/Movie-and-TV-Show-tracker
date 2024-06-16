const express = require('express');
const movieRouter = express.Router();
const axios = require('axios');

movieRouter.get('/search', (req, res) => {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=TMDB_API_KEY&query=${req.query.query}&page=${req.query.page}`;
    axios.get(url)
        .then((response) => {
            console.log(req.query);
            return res.json(response.data);
        })
});

movieRouter.get('/getById', (req, res) => {
    let url = `https://api.themoviedb.org/3/movie/${req.query.id}?api_key=TMDB_API_KEY&append_to_response=credits`;
    axios.get(url)
        .then((response) => {
            console.log(req.query);
            return res.json(response.data);
        })
});

module.exports = movieRouter;