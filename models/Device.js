const mongoose = require('mongoose');
const SensorSchema = mongoose.Schema({
    serialNumber:{
        type: String,
        required: true,
        unique: true
    },
    model:{
        type: String,
    },
    ownerId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    zoneId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Zone', 
        required: true 
    },
    installedAt:{
        type: date,
    },
    status:{
        enum: ['active', 'mantenance', 'offline'],
    },
});