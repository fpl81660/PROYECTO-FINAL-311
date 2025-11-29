const express = require('express');
const router = express.Router();
const zoneService = require('../services/zoneService'); 

router.get('/',async (req, res) => {
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

router.get('/:id', async (req,res) =>{
    try {
    const {idZone} = req.params; 
    const zone = await zoneService.getById(idZone);
    res.json(zone);
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
})

router.post('/', async (req, res) => {
    try {
        const createdZone = await zoneService.create(req.body);
        res.status(201).json(createdZone);        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id', (req, res) => {
    Zone.updateOne({
        _id: req.params.id
    },
        {
            $set: { 
                name: req.body.name,
                description: req.body.description, 
                isActive: req.body.isActive 
            }
        })
        .then(data => {
            res.json(data);
        })
        .catch(e => {
            res.json({ message: e })
        })
});

router.delete('/:id', (req, res) => {
    Zone.deleteOne({
        _id: req.params.id
    })
        .then(data => {
            res.json(data);
        })
        .catch(e => {
            res.json({ message: e })
        });
});

module.exports = router;
