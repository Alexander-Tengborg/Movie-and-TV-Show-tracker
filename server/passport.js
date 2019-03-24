const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('./models/User');
const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'mgfrodsfmg988j452980475nh203945821u' //change this, and put it in the config/env variables.

passport = (passport) => {
    passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
        module.exports = passport;
        User.findById(jwt_payload.id)
            .then(user => {
                if(user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => console.error(err));
    }));
}

module.exports = passport