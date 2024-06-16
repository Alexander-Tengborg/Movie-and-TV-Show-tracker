const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    shows: [{ type: mongoose.Schema.Types.Object, ref: 'Show' }],
    watchlists: [{ type: mongoose.Schema.Types.Object, ref: 'Watchlist'}]
});

var User = new mongoose.model('User', userSchema);

module.exports = User;

// var episodes1 = [
//     new Episode({
//         episodeId: 4312,
//         episodeName: 'u',
//         watched: true
//     }),
//     new Episode({
//         episodeId: 4313,
//         episodeName: 'eeh',
//         watched: true
//     }),
//     new Episode({
//         episodeId: 4314,
//         episodeName: 'fkoe',
//         watched: true
//     })
// ]

// var episodes2 = [
//     new Episode({
//         episodeId: 4320,
//         episodeName: 'agerh',
//         watched: true
//     }),
//     new Episode({
//         episodeId: 4321,
//         episodeName: 'eaeg',
//         watched: false
//     }),
//     new Episode({
//         episodeId: 4321,
//         episodeName: 'jio',
//         watched: false
//     })
// ]

// var seasons = [
//     new Season({
//         seasonId: 132,
//         seasonName: 'season 1',
//         episodes: episodes1
//     }),
//     new Season({
//         seasonId: 133,
//         seasonName: 'season 2',
//         episodes: episodes2
//     })
// ]

// var shows = [
//     new Show({
//         showId: 12,
//         showName: 'show 1',
//         seasons: seasons
//     }),
//     new Show({
//         showId: 13,
//         showName: 'show 2',
//         seasons: seasons
//     })
// ]

// var user = new User({
//     username: 'Test',
//     email: 'Test@Gmail.com',
//     password: bcrypt.hashSync('Test'),
//     // shows: shows
// });

// user.save();

// https://stackoverflow.com/questions/21971666/mongoose-unique-field
// https://mlab.com/databases/tmdb-test/collections/users?_id=5c505921ea71d43cb8dfff91&pageSize=10&pageNum=0&totalCount=2&
// https://stackoverflow.com/questions/14287617/mongoose-changing-schema-format 