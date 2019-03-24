const mongoose = require('mongoose');

var featuredSchema = new mongoose.Schema({
    featuredId: {
        type: Number,
        required: true,
        unique: true
    },
    featuredName: {
        type: String,
        required: true
    },
    
});

var Featured = new mongoose.model('Featured', featuredSchema);