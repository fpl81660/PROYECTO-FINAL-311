const express = require('express');
const router = express.Router();
const sensorService = require('../services/sensorService'); 

router.get('/', async (req, res) => {
    try {
        const sensors = await sensorService.getAll();
        res.status(200).json(sensors);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los sensores",
            error: error.message
        })
    }
});
router.get('/:idSensor', async (req, res) => {
    try {
        const { idSensor } = req.params;
        const sensor = await sensorService.getById(idSensor);
        if (!sensor) {
            return res.status(404).json({ message: "Sensor no encontrado" });
        }
        res.json(sensor);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
});

router.post('/', async (req, res) => {
    try {
        const createdSensor = await sensorService.create(req.body);
        res.status(201).json(createdSensor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const {id} = req.params; 
        const updatedSensor = await sensorService.update(id, req.body); 
        res.status(200).json(updatedSensor);
    } catch (error){
        if(error.message === 'Sensor Not Found'){
            return res.status(404).json({ message: error.message});
        }

        res.status(500).json({ message: error.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params; 
        const result = await sensorService.delete(id);
        res.json({
            message: "Sensor deleted", 
            result
        }); 
    } catch (error) {
        res.status(404).json({ message: error.message}); 
    }
});

module.exports = router;