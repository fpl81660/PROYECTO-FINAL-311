const mongoose = require('mongoose');
const ReadingSchema = mongoose.Schema({
    sensorId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Sensor', 
        required: true 
    },

    time:{
        type: Date,
        default: Date.now,
    },
    value:{
        type: Number,
    },
});


module.exports = mongoose.model('Reading', ReadingSchema);