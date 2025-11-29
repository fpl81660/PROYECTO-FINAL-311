const express = require('express');
const router = express.Router();
const readingService = require('../services/readingService'); 

router.get('/', async (req, res) => {
    try {
        const readings = await readingService.getAll();
        res.status(200).json(readings);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener las lecturas",
            error: error.message
        });
    }
});

router.get('/:idReading', async (req, res) => {
    try {
        const { idReading } = req.params;
        const reading = await readingService.getById(idReading);
        if (!reading) {
            return res.status(404).json({ message: "Lectura no encontrada" });
        }
        res.json(reading);
    } catch (error) {
        res.status(404).json({ message: error.message }); 
    }
});

router.post('/', async (req, res) => {
    try {
        const createdReading = await readingService.create(req.body);
        res.status(201).json(createdReading);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const {id} = req.params; 
        const updatedReading = await readingService.update(id, req.body); 
        res.status(200).json(updatedReading);
    } catch (error){
        if(error.message === 'Reading Not Found'){
            return res.status(404).json({ message: error.message});
        }

        res.status(500).json({ message: error.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params; 
        const result = await readingService.delete(id);
        res.json({
            message: "Reading deleted", 
            result
        }); 
    } catch (error) {
        res.status(404).json({ message: error.message}); 
    }
});

module.exports = router;
