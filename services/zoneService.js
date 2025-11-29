const Zone = require('../models/Zone');

class zoneService {

    async getAll() {
        try {
            const zones = await Zone.find();
            return zones; 
        } catch (error) {
            throw error;
        }
    }

    async getById(id){
        const zone = await Zone.findById(id);
        if (!zone){
            throw new Error('Zone Not Found'); 
        }

        return zone; 
    }

    async create(data){
        const newZone = new Zone(data); 
        return await newZone.save(); 
    }; 

}

module.exports = new zoneService(); 