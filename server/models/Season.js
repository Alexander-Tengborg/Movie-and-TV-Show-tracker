const mongoose = require('mongoose');

var seasonSchema = new mongoose.Schema({
    seasonId: {
        type: Number,
        required: true,
        unique: true
    },
    seasonName: {
        type: String,
        required: true
    },
    
    episodes: [{ type: mongoose.Schema.Types.Object, ref: 'Episode' }]
});

var Season = new mongoose.model('Season', seasonSchema);