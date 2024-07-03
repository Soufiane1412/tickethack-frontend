var express = require('express');
var router = express.Router();
const Cart = require('../models/carts');
const moment = require('moment');


router.post('/post/:trip', (req,res) => {
    const tripId = req.params.trip; 
    const newCart = new Cart ({
        trip:tripId,
    });
    Cart.findOne({trip:tripId}).then(result => {
    if (result === null) {
        newCart.save().then(result =>{
            res.json({result: true, trip:'trip added to your cart'})
        })
    } else {
        res.json({results:false, trip:'trip already in cart'})
    };
    });
});

router.delete('/delete/:trip', (req,res) => {
    const deletedTrip = req.params.trip;

    Cart.deleteOne({trip:deletedTrip}).then(result =>{ 
        res.json({
            deleted:deletedTrip,
            trip:result
        });
    });

});

router.get('/', (req,res) => {
    Cart.find().sort({date:-1})
    .populate('trip')
    .then(result =>{
        if(result) {
            res.json({result: true,trips:result})
        } else {
            res.json({result:false});
        }
    });
});

module.exports = router;