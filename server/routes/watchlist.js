const express = require('express');
const watchlistRouter = express.Router();
const axios = require('axios');
const isEmpty = require('../util/isEmpty')
const Watchlist = require('../models/Watchlist');
const Item = require('../models//Item');
const User = require('../models/User');
//Have to fix the refresh buttons,
//Or however I am going to populate/refresh this.
watchlistRouter.get('/all', (req, res) => {
    // console.log(req)

    //Watchlist.collection.dropIndexes()
    Watchlist.find({ userId: req.user._id }, { list: 0 }).then((result) => {
        res.json(result);
    })
});

watchlistRouter.get('/:id', (req, res) => {
    let id = req.params.id;
    if(isEmpty(id)) return res.json({ error: 'ID cannot be empty!'});

    Item.find({ watchlistId: id }).then((result) => {
        res.json(result);
    })
});

//change this to not use params.
watchlistRouter.get('/create/:name', (req, res) => {
    let name = req.params.name;
    if(isEmpty(name)) return res.json({ error: 'Name cannot be empty!'});

    let watchlist = new Watchlist({ name: name, userId: req.user._id });

    watchlist.save((error) => {
        if(error) return res.json({ error: error });
    })   

    res.json(watchlist)
});

watchlistRouter.get('/remove/:id', (req, res) => {
    let id = req.params.id
    if(isEmpty(id)) return res.json({ error: 'ID cannot be empty!'});

    Watchlist.deleteOne({ _id: id}, (error, result) => {
        if(error) return res.json({ error: error });
    })

    Item.deleteMany({ watchlistId: id}, (error, result) => {
        if(error) return res.json({ error: error });
    })

    res.json({ response: 'Success!' });
});


//MAKE SURE TO CHECK THAT THE ITEM DOES NOT EXIST IN THE LIST ALREADY!
watchlistRouter.post('/addItem/', (req, res) => {
    // console.log(req.body)
    //MAKE SURE TO ALSO CHECK CATEGORY
    Item.find({ id: req.body.id, watchlistId: req.body.watchlistId, category: req.body.category }, (error, result) => {
        if(result.length > 0) {
            return res.json({ error: 'The movie/tv show you tried to add already exists in the list!'});
        } else {
            let item = new Item(req.body);

            item.save((error) => {
                if(error) return res.json({ error: error });
            }) 
        
            res.json({ response: 'Success!'} )
        }
    })
});

//CHECK CATEGORY WHEN REMOVING!!!
watchlistRouter.post('/removeItem/', (req, res) => {
    Item.deleteOne({ id: req.body.id, watchlistId: req.body.watchlistId, category: req.body.category }, (error, result) => {
        if(error) return res.json({ error: error });
    })

    res.json({ response: 'Success!' });
});

watchlistRouter.post('/getItems/', (req, res) => {
    Item.find({ id: req.body.id, category: req.body.category, watchlistId: { $in: req.body.watchlistIds } }, (error, result) => {
        if(error) return res.json({ error: error });
        return res.json(result);
    })
});

module.exports = watchlistRouter;