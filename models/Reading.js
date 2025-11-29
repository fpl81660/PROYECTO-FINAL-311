const mongoose = require('mongoose');
const ReadingSchema = mongoose.Schema({
    sensorId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Sensor', 
        required: true 
    },

    tipe:{
        type: Date,
    },
    value:{
        type: Number,
    },
});


module.exports = mongoose.model('Reading', ReadingSchema);