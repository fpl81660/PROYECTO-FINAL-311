const express = require('express');
const router = express.Router();
const zoneService = require('../services/zoneService');

router.get('/', async (req, res) => {
    try {
        const zones = await zoneService.getAll();
        res.status(200).json(zones);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener las zonas",
            error: error.message
        });
    }
});

router.get('/:idZone', async (req, res) => {
    try {
        const { idZone } = req.params;
        const zone = await zoneService.getById(idZone);
        if (!zone) {
            return res.status(404).json({ message: "Zona no encontrada" });
        }
        res.json(zone);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
});

router.post('/', async (req, res) => {
    try {
        const createdZone = await zoneService.create(req.body);
        res.status(201).json(createdZone);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const {id} = req.params; 
        const updatedZone = await zoneService.update(id, req.body); 
        res.status(200).json(updatedZone);
    } catch (error){
        if(error.message === 'Zone Not Found'){
            return res.status(404).json({ message: error.message});
        }

        res.status(500).json({ message: error.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params; 
        const result = await zoneService.delete(id);
        res.json({
            message: "Zone deleted", 
            result
        }); 
    } catch (error) {
        res.status(404).json({ message: error.message}); 
    }
});

module.exports = router;
