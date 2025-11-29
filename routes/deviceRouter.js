const express = require('express');
const router = express.Router();
const deviceService = require('../services/deviceService'); 

router.get('/', async (req, res) => {
    try {
        const device = await deviceService.getAll();
        res.status(200).json(device);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener las device",
            error: error.message
        });
    }
});

router.get('/:idDevice', async (req, res) => {
    try {
        const { idDevice } = req.params;
        const device = await deviceService.getById(idDevice);
        if (!device) {
            return res.status(404).json({ message: "device no encontrada" });
        }
        res.json(device);
    } catch (error) {
        res.status(404).json({ message: error.message }); 
    }
});

router.post('/', async (req, res) => {
    try {
        const createdDevice = await deviceService.create(req.body);
        res.status(201).json(createdDevice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const {id} = req.params; 
        const updatedDevice = await deviceService.update(id, req.body); 
        res.status(200).json(updatedDevice);
    } catch (error){
        if(error.message === 'Device Not Found'){
            return res.status(404).json({ message: error.message});
        }

        res.status(500).json({ message: error.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params; 
        const result = await deviceService.delete(id);
        res.json({
            message: "Device deleted", 
            result
        }); 
    } catch (error) {
        res.status(404).json({ message: error.message}); 
    }
});

module.exports = router;
