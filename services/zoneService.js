const Zone = require('../models/Zone');
const Device = require('../models/Device');

class zoneService {

    async getAll() {
        try {
            const zones = await Zone.find();
            return zones;
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        const zone = await Zone.findById(id);
        if (!zone) {
            throw new Error('Zone Not Found');
        }

        return zone;
    };

   async create(data) {
        const { name, description, isActive } = data; 
        const newZone = new Zone({ name, description, isActive });
        return await newZone.save();
    };

    async update(id, data) {
        const zoneToUpdate = await Zone.findById(id);
        if (!zoneToUpdate) {
            throw new Error('Zone Not Found');
        }

        if (data.isActive === false) {
            const ZoneInDevice = await Device.findOne({ zoneId: id });
            if (ZoneInDevice) {
                throw new Error('Zone has associated Devices and cannot be set as false');
            }
        }

        zoneToUpdate.set(data);
        return await zoneToUpdate.save();
    };

    async delete(id) {
        const zoneDeleted = await Zone.findById(id);
        if (!zoneDeleted) {
            throw new Error('Zone Not Found');
        }
        const ZoneInDevice = await Device.findOne({ zoneId: id });
        if (ZoneInDevice) {
            throw new Error('Zone has associated Devices and cannot be deleted');
        }
        
       await zoneDeleted.deleteOne();

        return zoneDeleted;
    };

}

module.exports = new zoneService(); 