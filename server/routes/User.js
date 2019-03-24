const express = require('express');
const userRouter = express.Router();

userRouter.get('/me', (req, res) => {
    return res.json({
        id: 'test'
    })
});

module.exports = userRouter;