const express = require('express');
const featuredRouter = express.Router();
const axios = require('axios');
const isEmpty = require('../util/isEmpty')
const Featured = require('../models/Featured');

//Have to fix the refresh buttons,
//Or however I am going to populate/refresh this.
featuredRouter.get('/all', (req, res) => {
    let url = '';
    Featured.find({}).then((results) => {
        res.json(results);
    })
});

featuredRouter.post('/update/:type/:category', (req, res) => {
    let types = ['top_rated', 'popular', 'upcoming'] //Change variable name?
    let categories = ['movie', 'tv'];
    
    let type = req.params.type;
    let category = req.params.category;

    if(!types.includes(type)) return res.json({ error: 'Invalid type'});
    if(!categories.includes(category)) return res.json({ error: 'Invalid category'});


    let url = `https://api.themoviedb.org/3/${category}/${type}?api_key=TMDB_API_KEY`;
    axios.get(url)
        .then((response) => {
            if(isEmpty(response.data.results)) return res.json({ error: 'Bad response'})
            Featured.deleteMany({type: type, category: category}, (err, response) => {
                console.log('delete');
            })
            // Featured.collection.dropIndexes() !!!
            response.data.results.map((result) => {
                console.log(result.id);
                console.log(result.overview)
                let values = {
                    id: result.id,
                    type: type,
                    category: category,
                    name: (category == 'tv') ? result.name : result.title,
                    posterPath: result.poster_path,
                    releaseDate: (category == 'tv') ? result.first_air_date : result.release_date,
                    overview: result.overview
                }
                let featured = new Featured(values)
                featured.save()
            });
            return res.json({ response: 'Success!' });
        })
});

module.exports = featuredRouter;