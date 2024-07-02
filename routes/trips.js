var express = require('express');
var router = express.Router();
const Trip = require('../models/trips');


router.post('/', (req,res) => {
    const newTrip = new Trip ({
        departure:req.body.departure,
        arrival:req.body.arrival,
        date:{date:req.body.date},
        price:req.body.price,
    });

    newTrip.save().then(() => {
        Trip.find().then(data =>{
            res.json({newTrip:data})
        });
    });
});

module.exports = router;