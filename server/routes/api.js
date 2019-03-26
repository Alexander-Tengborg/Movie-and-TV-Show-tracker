const express = require('express');
const passport = require('passport');
const router = express.Router();

const authRouter = require('./auth');
const userRouter = require('./user');
const tvRouter = require('./tv');
const movieRouter = require('./movie');
const featuredRouter = require('./featured')

router.use('/auth', authRouter)
router.use('/users', passport.authenticate('jwt', { session: false }), userRouter);
router.use('/tv', passport.authenticate('jwt', { session: false }), tvRouter);
router.use('/movie', passport.authenticate('jwt', { session: false }), movieRouter);
router.use('/featured', passport.authenticate('jwt', { session: false }), featuredRouter);

module.exports = router;