const mongoose = require('mongoose');
const ZoneSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
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