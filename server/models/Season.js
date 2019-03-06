const mongoose = require('mongoose');

var seasonSchema = new mongoose.Schema({
    seasonId: Number,
    seasonName: String,
    episodes: [{ type: mongoose.Schema.Types.Object, ref: 'Episode' }]
});

var Season = new mongoose.model('Season', seasonSchema);