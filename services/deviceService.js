const Device = require('../models/Device');
const User = require('../models/User');
const Zone = require('../models/Zone');
const Sensor = require('../models/Sensor');

class deviceService {
    async getAll() {
        try {
            const device = await Device.find();
            return device;
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        const device = await Device.findById(id);
        if (!device) {
            throw new Error('Device Not Found');
        }

        return device;
    };

    async create(data) {
        const owner = await User.findById(data.ownerId);
        const zone = await Zone.findById(data.zoneId);

        if (!owner) {
            throw new Error('Owner (User) Not Found');
        }
        if (!zone) {
            throw new Error('Zone Not Found');
        }
        if (zone.isActive === false) {
            throw new Error('Zone is inactive and cannot be used');
        }

        const sensorIds = data.sensors || [];

        if (sensorIds.length > 0) {
            const foundSensors = await Sensor.find({
                _id: { $in: sensorIds }
            });

            if (foundSensors.length !== sensorIds.length || foundSensors.isActive.includes(false)) {
                throw new Error('One or more Sensor IDs are invalid or not found.');
            }
        }


        const newDevice = new Device(data);
        return await newDevice.save();
    };

    async update(id, data) {
        const DeviceUpdated = await Device.findByIdAndUpdate(id, data, { new: true });
        if (!DeviceUpdated) {
            throw new Error('Device Not Found');
        }
        const ownerId = await User.findById(data.ownerId);
        const zoneId = await Zone.findById(data.zoneId);
        const sensors = await Sensor.findById(data.sensors);
        if (!ownerId || !zoneId || !sensors) {
            throw new Error('User, Zone or Sensor Not Found')
        }
        return await DeviceUpdated;
    };

    async delete(id) {
        const DeviceDeleted = await Device.findByIdAndDelete(id);
        if (!DeviceDeleted) {
            throw new Error('Device Not Found');
        }
        return DeviceDeleted;
    };

}

module.exports = new deviceService(); 