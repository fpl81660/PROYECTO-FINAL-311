const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

router.get('/', async (req, res) => {
    try {
        const User = await userService.getAll();
        res.status(200).json(User);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los User",
            error: error.message
        });
    }
});

router.get('/:idUser', async (req, res) => {
    try {
        const { idUser } = req.params;
        const User = await userService.getById(idUser);
        if (!User) {
            return res.status(404).json({ message: "User no encontrada" });
        }
        res.json(User);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
});

router.post('/', async (req, res) => {
    try {
        const createdUser = await userService.create(req.body);
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const {id} = req.params; 
        const updatedUser = await userService.update(id, req.body); 
        res.status(200).json(updatedUser);
    } catch (error){
        if(error.message === 'User Not Found'){
            return res.status(404).json({ message: error.message});
        }

        res.status(500).json({ message: error.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params; 
        const result = await userService.delete(id);
        res.json({
            message: "User deleted", 
            result
        }); 
    } catch (error) {
        res.status(404).json({ message: error.message}); 
    }
});

module.exports = router;
