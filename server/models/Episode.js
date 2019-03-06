const mongoose = require('mongoose');

var episodeSchema = new mongoose.Schema({
    episodeId: Number,
    episodeName: String,
    watched: Boolean
});

var Episode = new mongoose.model('Episode', episodeSchema);