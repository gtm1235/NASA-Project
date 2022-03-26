const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
        // min: 100,
        // max: 999,
    },
    launchDate: {
        type: Date,
        required: true,
    },
    mission: {
        type:String,
        required: true,
    },
    rocket: {
        type: String,
        required: true,
    },
    // target: {
    //     type: mongoose.ObjectId,
    //     ref: 'Planet',
    // }
    target: {
        type: String,
    required: true,
    },
    customer: [ String ],
    upcoming: {
        type: Boolean,
        required: true,
    },
    success: {
        type: Boolean,
        required: true,
        default: true,
    },
});

// Connects launchesSchena with the "launches" collection
module.exports = mongoose.model('Launch', launchesSchema);