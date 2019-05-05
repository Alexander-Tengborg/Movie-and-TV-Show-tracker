const mongoose = require('mongoose');

var showSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    seasons: [{ type: mongoose.Schema.Types.Object, ref: 'Season' }]
});

var Show = new mongoose.model('Show', showSchema);


module.exports = Show;