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
        type: Date, 
        default: Date.now,
    },
    status:{
        type: String,
        enum: ['active', 'maintenance', 'offline'],
    },
    sensors:{
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'Sensor', 
    }
});

module.exports = mongoose.model('Device', DeviceSchema);