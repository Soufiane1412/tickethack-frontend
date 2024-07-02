var express = require('express');
var router = express.Router();
const Booking = require('../models/bookings');


router.post('/post/:bookings', (req,res) => {
    const newBooking = new Booking ({
        bookings:req.params.bookings,
    });
    newBooking.save().then(() => {
        Booking.findOne().then(result => {
            res.json({trip:result});
        });
    });
});

router.get('/', (req,res) => {
    Booking.find()
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