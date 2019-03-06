const mongoose = require('mongoose');

var showSchema = new mongoose.Schema({
    showId: Number,
    showName: String,
    seasons: [{ type: mongoose.Schema.Types.Object, ref: 'Season' }]
});

var Show = new mongoose.model('Show', showSchema);