var express = require('express');
var router = express.Router();
const Trip = require('../models/trips');
const moment = require('moment');
const date_format = 'YYYY-MM-DD';

router.get('/', (req,res) => {
    const {departure, arrival, date} = req.body;
    Trip.find({departure:departure, arrival:arrival}).then(results =>{
        const newDate = moment(date).format(date_format);
        results = results.filter(result=> moment(result.date).format(date_format) === newDate);
        res.json({trips:results})
    });

});

module.exports = router;