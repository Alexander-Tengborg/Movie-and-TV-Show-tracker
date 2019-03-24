const mongoose = require('mongoose');

var episodeSchema = new mongoose.Schema({
    episodeId: {
        type: Number,
        required: true,
        unique: true
    },
    episodeName: {
        type: String,
        required: true
    },
    watched: {
        type: Boolean,
        default: true
    }
});

var Episode = new mongoose.model('Episode', episodeSchema);