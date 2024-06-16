const express = require('express');
const tvRouter = express.Router();
const axios = require('axios');

//FIX ERROR HANDLING
tvRouter.get('/search', (req, res) => {
    let url = `https://api.themoviedb.org/3/search/tv?api_key=TMDB_API_KEY&query=${req.query.query}&page=${req.query.page}`;
    axios.get(url)
        .then((response) => {
            return res.json(response.data);
        })
});

tvRouter.get('/getById', (req, res) => {
    let url = `https://api.themoviedb.org/3/tv/${req.query.id}?api_key=TMDB_API_KEY&append_to_response=credits`;
    axios.get(url)
        .then((response) => {
            console.log(req.query);
            return res.json(response.data);
        })
});

tvRouter.get('/seasons', (req, res) => {
    let query = req.query.query.replace(/%2F/, ','); //temporary fix
    console.log(req.query);
    let url = `https://api.themoviedb.org/3/tv/${req.query.id}?api_key=TMDB_API_KEY&append_to_response=${req.query.query}`;
    axios.get(url)
        .then((response) => {
            return res.json(response.data);
        })
});

module.exports = tvRouter;