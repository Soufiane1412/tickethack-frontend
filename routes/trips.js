var express = require('express');
var router = express.Router();
const Trip = require('../models/trips');
const moment = require('moment');
const { checkParam } = require('../modules/checkParam');

router.get('/', (req,res) => {
    // Get query parameters
    const {departure, arrival, date} = req.query;

    //  Check all parameters
    if(!checkParam(req.query,['departure', 'arrival','date'])) {
        res.json({
            result:  false, error: 'Missing or empty fields'
        }); 
        return; 
    }

    // Get start day
    let startDay = moment.utc(date).startOf('day').toISOString();
   
    //Get end day
    let endDay = moment.utc(date).endOf('day').toISOString();

    //Build BDD Query
    Trip.find({
        departure:{$regex:new RegExp(departure,'i')}, 
        arrival:{$regex: new RegExp(arrival,'i')}, 
      date:{
            $gt:startDay, 
            $lt:endDay
        }
    }).then(results =>{
        results.length === 0 ? res.json({results:false}) : res.json({results:true, trips:results})
    });
});

module.exports = router;