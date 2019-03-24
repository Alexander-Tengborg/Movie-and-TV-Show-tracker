import axios from 'axios';

//use redux + thunk?

export function search(category, query, page) {
    if(category === 'tv') {
        return searchTv(query, page)        
    } else if(category === 'movie') {
        return searchMovie(query, page);
    }
}

export function searchTv(query, page) {
    return axios.get('/api/tv/search', {params: { query, page }});
}

export function searchMovie(query, page) {
    return axios.get('/api/movie/search', {params: { query, page }})
}

export function getById(category, id) {
    if(category === 'tv') {
        return getTvById(id)        
    } else if(category === 'movie') {
        return getMovieById(id);
    }
}

export function getTvById(id) {
    return axios.get('/api/tv/getById', {params: { id }})
}

export function getMovieById(id) {
    return axios.get('/api/movie/getById', {params: { id }})
}

export function getSeasons(id, query) {
    return axios.get('/api/tv/seasons', {params: { id, query }})
}
