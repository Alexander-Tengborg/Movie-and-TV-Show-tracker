const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateLoginInput = require('../login');

const User = require('../models/User');

//TESTS???????????+
//https://codeutopia.net/blog/2016/06/10/mongoose-models-and-unit-tests-the-definitive-guide/

////The unique property does not work, so i either have to check them myself or use the library mongoose-unique-validator

//or maybe it does work, i got the following email with duplicate emails:
// (node:7708) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): MongoError: E11000 duplicate key error index: turbo-oc
// to.users.$email_1 dup key: { : "test@gmail.com" }

// authRouter.post('/register', (req, res) => {
//     // const { errors, isValid } = validateRegisterInput(req.body);

//     // req.body = {
//     //     email: 'test@gmail.com',
//     //     username: 'rggseg',
//     //     password: 'test'
//     // }

//     // if(!isValid) {
//     //     return res.status(400).json(errors);
//     // }

//     //the following only checks if the email exists if the username does not exist, so if both exists, it only says that the username exists.
//     User.findOne({
//         username: req.body.username
//     }).then(user => {
//         if(user) {
//             return res.status(400).json({
//                 username: 'Username already exists!'
//             });
//         } else {
//             User.findOne({
//                 email: req.body.email
//             }).then((user) => {
//                 if(user) {
//                     return res.status(400).json({
//                         email: 'Email already exists!'
//                     });

//                     const newUser = new User({
//                         email: req.body.email,
//                         username: req.body.username,
//                         password: req.body.password
//                     });
//                     //should check 
//                     bcrypt.genSalt(10, (err, salt) => {
//                         if(err)  {
//                             console.error('There was an error', err);
//                         } else {
//                             bcrypt.hash(newUser.password, salt, (err, hash) => {
//                                 if(err) {
//                                     console.error('There was an error', err);
//                                 } else {
//                                     newUser.password = hash;
//                                     newUser.save().then((user) => {
//                                         res.json(user); //should not return the user to the client??
//                                     })
//                                 }
//                             });
//                         }
//                     })
//                 }
//             })
//         }
//     })
// });

authRouter.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username })
        .then((user) => {
            if(!user) {
                errors.username = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        const payload = { //put additional userdata here that the user should have.
                            id: user.id,
                            username: user.username
                        }
                        jwt.sign(payload, 'mgfrodsfmg988j452980475nh203945821u', {
                            expiresIn: '24h' //change this??
                        }, (err, token) => {
                            if(err) {
                                console.error('There was an error with the token', err);
                            } else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                })
                            }
                        })
                    } else {
                        errors.password = 'Incorrect password';
                        return res.status(400).json(errors);
                    }
                })
        })
});

authRouter.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        username: req.user.username,
        created: req.user.created
    })
});

module.exports = authRouter;