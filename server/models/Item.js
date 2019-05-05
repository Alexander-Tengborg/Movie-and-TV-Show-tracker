const mongoose = require('mongoose');

//FIX THE NAMES!
//Some have featured in them, while others dont.
var itemSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
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
    },
    watchlistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Watchlist'},
});

var Item = new mongoose.model('Item', itemSchema);

module.exports = Item;