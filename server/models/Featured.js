const mongoose = require('mongoose');

//FIX THE NAMES!
//Some have featured in them, while others dont.
var featuredSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    type: {
        type: String, //int instead? 
        required: true
    },
    category: {
        type: String, //int instead? ex, 0 being tv, and 1 being movie.
        required: true
    },
    name: {
        type: String,
        required: true
    },
    posterPath: {
        type: String,
    },
    releaseDate: {
        type: String, //date??
    },
    overview: {
        type: String
    }
}, { collection: 'featured' });

var Featured = new mongoose.model('Featured', featuredSchema);

module.exports = Featured;