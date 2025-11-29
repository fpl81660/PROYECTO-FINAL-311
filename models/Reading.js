const mongoose = require('mongoose');
const SensorSchema = mongoose.Schema({
    sensorId:{
        type: mongoose.Schema.Types.ObjectId, // Referencia a otro documento
        ref: 'Sensor', // ¡Esto enlaza con el modelo 'Sensor'!
        required: true 
    },

    tipe:{
        type: date,
    },
    value:{
        type: number,
    },
});