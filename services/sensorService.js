const Sensor = require('../models/Sensor');
const Reading = require('../models/Reading');
const Device = require('../models/Device');
const SENSOR_CONFIG = {
    'Temperature': '°C',
    'Humidity': '%',
    'Co2': 'ppm',
    'Noise': 'dB'
};
class sensorService {
    async getAll() {
        try {
            const sensor = await Sensor.find();
            return sensor;
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        const sensor = await Sensor.findById(id);
        if (!sensor) {
            throw new Error('Sensor Not Found');
        }

        return sensor;
    };


    async create(data) {
        const { type, model, location, isActive } = data;

        const unit = SENSOR_CONFIG[type];


        const newSensor = new Sensor({ type, unit, model, location, isActive });

        return await newSensor.save();
    };

    async update(id, data) {
        const sensorToUpdate = await Sensor.findById(id);
        if (!sensorToUpdate) {
            throw new Error('Sensor Not Found');
        }
        if (data.type) {
            throw new Error('Type cannot be changed');
        }
        if (data.unit) {
            throw new Error('Unit cannot be changed');
        }

        if (data.isActive === false) {
            const SensorInDevice = await Device.findOne({ sensors: id });
            const SensorInReading = await Reading.findOne({ sensorId: id });
            if (SensorInDevice || SensorInReading) {
                throw new Error('Sensor has associated Devices/Readings and cannot be set as false');
            }
        }

        Object.keys(data).forEach((key) => {
            if (data[key] !== null && data[key] !== undefined) {
                sensorToUpdate[key] = data[key];
            }
        });

        return await sensorToUpdate.save();
    };

    async delete(id) {
        const sensorToDelete = await Sensor.findById(id);
        if (!sensorToDelete) {
            throw new Error('Sensor Not Found');
        }

        const sensorInDevice = await Device.findOne({ sensors: id });
        const sensorInReading = await Reading.findOne({ sensorId: id });

        if (sensorInDevice || sensorInReading) {
            throw new Error('Sensor has associated Devices/Readings and cannot be deleted');
        }

        await sensorToDelete.deleteOne();

        return sensorToDelete;
    };

}

module.exports = new sensorService(); 