const mongoose = require('mongoose');
const ZoneSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    description:{
        type: String
    },
    isActive:{
        type: Boolean,
    }
});

module.exports = mongoose.model('Zone', ZoneSchema);