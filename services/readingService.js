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
        const { sensorId, time, value } = data; 

        const usedSensor = await Sensor.findById(sensorId); 
        
        if(!usedSensor){
            throw new Error('Sensor Not Found'); 
        } 
        if(usedSensor.isActive === false){
            throw new Error('Sensor is inactive and cannot be used');
        } 
        
        const newReading = new Reading({ sensorId, time, value }); 
        return await newReading.save(); 
    }; 

    async update(id, data){
        const ReadingUpdated = await Reading.findById(id);
        if(!ReadingUpdated){
            throw new Error('Reading Not Found');
        }
        if(data.sensorId){
            throw new Error('Sensor ID cannot be changed');
        } 

        ReadingUpdated.set(data); 

        return await ReadingUpdated.save();
    };
    
    async delete(id){
        const readingToDelete = await Reading.findById(id);
        if (!readingToDelete) {
            throw new Error('Reading Not Found');
        }
        
        await readingToDelete.deleteOne();

        return readingToDelete; 
    };

}

module.exports = new readingService(); 