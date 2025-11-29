const mongoose = require('mongoose');
const DeviceSchema = mongoose.Schema({
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
    },
    zoneId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Zone', 
    },
    installedAt:{
        type: date,
    },
    status:{
        enum: ['active', 'mantenance', 'offline'],
    },
    sensors:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Sensor', 
    }
});

module.exports = mongoose.model('Device', DeviceSchema);