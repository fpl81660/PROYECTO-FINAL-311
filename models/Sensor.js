const mongoose = require('mongoose');
const SensorSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: {
            values: ['Temperature', 'Humidity', 'Co2', 'Noise'],
            message: '{VALUE} no es un tipo de sensor valido. Tipos permitidos: Temperature, Humidity, co2 y Noise'
        }
    },

    unit: {
        type: String,
        required: true,
        enum: {
            values: ['°C', '%', 'ppm', 'dB'],
            message: '{VALUE} No es una unidad valida. Unidades permitidas: °C, %, ppm, dB'
        }

    },
    model: {
        type: String,
    },
    location: {
        type: String,
        required: true,
        match: [
            /^-?\d{1,3}\.\d+, ?-?\d{1,3}\.\d+$/,
            'El formato de ubicación debe ser "latitud, longitud" (ej: 40.7128, -74.0060).'
        ]
    },
    isActive: {
        type: Boolean,
    }
});

module.exports = mongoose.model('Sensor', SensorSchema);