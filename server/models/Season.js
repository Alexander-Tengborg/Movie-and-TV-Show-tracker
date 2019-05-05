const mongoose = require('mongoose');

var seasonSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    
    episodes: [{ type: mongoose.Schema.Types.Object, ref: 'Episode' }]
});

var Season = new mongoose.model('Season', seasonSchema);


module.exports = Season;