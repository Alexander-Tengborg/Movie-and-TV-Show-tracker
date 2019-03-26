const mongoose = require('mongoose');


//FIX THE NAMES!
//Some have featured in them, while others dont.
var featuredSchema = new mongoose.Schema({
    featuredId: {
        type: Number,
        required: true,
        unique: true
    },
    featuredName: {
        type: String,
        required: true
    },
    featuredImgpath : {
        type: String,
        required: true
    },
    featuredreleaseDate: {
        type: String, //date??
        required: true
    },
    category: {
        type: String, //int instead? ex, 0 being tv, and 1 being movie.
        required: true
    },
    description : {
        type: String,
        required: true
    }
});

var Featured = new mongoose.model('Featured', featuredSchema);