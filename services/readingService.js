const Reading = require('../models/Reading'); 
const Sensor = require('../models/Sensor');

class readingService{
    async getAll(){
        try{
            const reading = await Reading.find();
            return reading; 
        } catch (error){
            throw error;
        }
    }
    
   async getById(id){
        const reading = await Reading.findById(id);
        if (!reading){
            throw new Error('Reading Not Found'); 
        }

        return reading; 
    };

    async create(data){
        const newReading = new Reading(data); 
        const usedSensor = await Sensor.findById(data.sensorId);
        if(!usedSensor){
            throw new Error('Sensor Not Found'); 
        }
        return await newReading.save(); 
    }; 

    async update(id, data){
        const ReadingUpdated = await Reading.findByIdAndUpdate(id, data, {new: true});
        if(!ReadingUpdated){
            throw new Error('Reading Not Found');
        }
        return ReadingUpdated; 
    };
    
    async delete(id){
        const ReadingDeleted = await Reading.findByIdAndDelete(id);
        if(!ReadingDeleted){
            throw new Error('Reading Not Found');
        }
        return ReadingDeleted; 
    };

}

module.exports = new readingService(); 