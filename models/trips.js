const mongoose = require('mongoose');

const tripDateSchema = mongoose.schema ({

    $date:Date,
});

const tripSchema = mongoose.Schema ({

    departure:String,
    arrival:String,
    date:[newTripDate],
    price:Number,
});

const Trip = mongoose.model('trips',tripSchema);
model.exports = Trip;
