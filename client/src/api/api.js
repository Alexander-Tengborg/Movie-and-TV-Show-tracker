import axios from 'axios';

//use redux + thunk?

//split this into multiple files, and/or remake this entire thing.


/* SEARCH FOR THE API FOR A SPECIFIC QUERY */
export function search(category, query, page) {
    if(category === 'tv') {
        return searchTv(query, page);
    } else if(category === 'movie') {
        return searchMovie(query, page);
    }
}

export function searchTv(query, page) {
    return axios.get('/api/tv/search', {params: { query, page }});
}

export function searchMovie(query, page) {
    return axios.get('/api/movie/search', {params: { query, page }});
}

/* END */


/* GET A SPECIFIC MOVIE/TV SHOW FROM THE API BY THEIR ID */

export function getById(category, id) {
    if(category === 'tv') {
        return getTvById(id);
    } else if(category === 'movie') {
        return getMovieById(id);
    }
}

export function getTvById(id) {
    return axios.get('/api/tv/getById', {params: { id }});
}

export function getMovieById(id) {
    return axios.get('/api/movie/getById', {params: { id }});
}

/* END */

/* GET X AMOUNT OF SEASONS OF A TV SHOW FROM THE API */
// The query variable should look like this: season\1,season\2,season\3... etc
// Should probably pass a from and a to variable and build the query inside the function instead.

export function getSeasons(id, query) {
    return axios.get('/api/tv/seasons', {params: { id, query }});
}

/* END */

/* GET ALL OR CERTAIN MOVIE/TV SHOW LISTS. SUCH AS TOP RATED, POPULAR and ALL. */

export function getAllFeatured() {
    return axios.get('/api/featured/all');
}

/* END */