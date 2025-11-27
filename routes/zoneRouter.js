const express = require('express');
const router = express.Router();
const Zone = require('../models/Zone'); 

router.post('/', (req, res) => {
    const zone = new Zone({
        id: req.body.id, 
        name: req.body.name, 
        description: req.body.description,
        isActive: req.body.isActive
    });

    zone.save()
        .then(data => {
            res.json(data);
        }).catch(e => {
            res.json({ message: e })
        })
});

module.exports = router;