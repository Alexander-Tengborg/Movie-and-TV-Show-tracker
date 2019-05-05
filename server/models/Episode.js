const mongoose = require('mongoose');

var episodeSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    watched: {
        type: Boolean,
        default: true
    }
});

var Episode = new mongoose.model('Episode', episodeSchema);


module.exports = Episode;