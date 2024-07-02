const mongoose = require('mongoose');

const tripDateSchema = mongoose.Schema ({
    $date:Date,
});

const tripSchema = mongoose.Schema ({

    departure:String,
    arrival:String,
    date:[tripDateSchema],
    price:Number,
});

const Trip = mongoose.model('trips',tripSchema);
module.exports = Trip;
