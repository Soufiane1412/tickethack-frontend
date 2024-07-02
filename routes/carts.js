var express = require('express');
var router = express.Router();
const Cart = require('../models/carts');
const moment = require('moment');


router.post('/post/:trip', (req,res) => {
    const newCart = new Cart ({
        trip:req.params.trip,
    });
    newCart.save().then(() => {
        Cart.findOne().then(result => {
            res.json({trip:result});
        });
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
    Cart.find()
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