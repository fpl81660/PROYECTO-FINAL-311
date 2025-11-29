const Sensor = require('../models/Sensor'); 

class sensorService{
    async getAll(){
        try{
            const sensor = await Sensor.find();
            return sensor; 
        } catch (error){
            throw error;
        }
    }
    
   async getById(id){
        const sensor = await Sensor.findById(id);
        if (!sensor){
            throw new Error('Sensor Not Found'); 
        }

        return sensor; 
    };

    async create(data){
        const newSensor = new Sensor(data); 
        return await newSensor.save(); 
    }; 

    async update(id, data){
        const SensorUpdated = await Sensor.findByIdAndUpdate(id, data, {new: true});
        if(!SensorUpdated){
            throw new Error('Sensor Not Found');
        }
        return SensorUpdated; 
    };
    
    async delete(id){
        const SensorDeleted = await Sensor.findByIdAndDelete(id);
        if(!SensorDeleted){
            throw new Error('Sensor Not Found');
        }
        return SensorDeleted; 
    };

}

module.exports = new sensorService(); 