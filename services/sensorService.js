const Sensor = require('../models/Sensor');
const Reading = require('../models/Reading');
const Device = require('../models/Device');

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
        const { type, unit, model, location, isActive } = data; 
        const newSensor = new Sensor({ type, unit, model, location, isActive });
        return await newSensor.save();
    };

    async update(id, data) {
        const sensorToUpdate = await Sensor.findById(id);
        if (!sensorToUpdate) {
            throw new Error('Sensor Not Found');
        }

        if (data.isActive === false) {
            const SensorInDevice = await Device.findOne({ sensors: id });
            const SensorInReading = await Reading.findOne({ sensorId: id });
            if (SensorInDevice || SensorInReading) {
                throw new Error('Sensor has associated Devices/Readings and cannot be set as false');
            }
        }

        sensorToUpdate.set(data);
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