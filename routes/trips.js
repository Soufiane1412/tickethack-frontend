var express = require('express');
var router = express.Router();
const Trip = require('../models/trips');
const moment = require('moment');
const date_format = 'YYYY-MM-DD';

router.get('/', (req,res) => {
    // Get query parameters
    const {departure, arrival, date} = req.query;

    // Get start day
    let startDay = moment.utc(date).startOf('day').toISOString();

    //Get end day
    let endDay = moment.utc(date).add(1, 'days').startOf('day').toISOString();
    
    //Build BDD Query
    Trip.find({
        departure:departure, 
        arrival:arrival, 
        date:{
            $gt:startDay, 
            $lt:endDay
        }
    }).then(results =>{
        results.length === 0 ? res.json({results:false}) : res.json({results:true, trips:results})
    });
});

module.exports = router;