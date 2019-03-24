const mongoose = require('mongoose');

var showSchema = new mongoose.Schema({
    showId: {
        type: Number,
        required: true,
        unique: true
    },
    showName: {
        type: String,
        required: true,
    },
    seasons: [{ type: mongoose.Schema.Types.Object, ref: 'Season' }]
});

var Show = new mongoose.model('Show', showSchema);