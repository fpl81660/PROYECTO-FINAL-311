const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

router.get('/', (req, res) => {
    Zone.find()
        .then(data => {
            res.json(data);
        })
        .catch(e => {
            res.json({ message: e })
        })
});

router.post('/', (req, res) => {
    const zone = new Zone({
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
