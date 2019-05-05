const mongoose = require('mongoose');

var watchlistSchema = new mongoose.Schema({
    // id: {
    //     type: Number,
    //     required: true,
    //     unique: true
    // },
    name: {
        type: String,
        required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    list: [{ type: mongoose.Schema.Types.Object, ref: 'Item' }]
});

var Watchlist = new mongoose.model('Watchlist', watchlistSchema);


module.exports = Watchlist;