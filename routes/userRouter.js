const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

/**
 * @swagger
 * /api/User:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error al obtener los usuarios
 */

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

/**
 * @swagger
 * /api/User/{idUser}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: idUser
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */

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

/**
 * @swagger
 * /api/User:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       500:
 *         description: Error al crear el usuario
 */

router.post('/', async (req, res) => {
    try {
        const createdUser = await userService.create(req.body);
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


/**
 * @swagger
 * /api/User/{id}:
 *   patch:
 *     summary: Actualiza un usuario por su ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al actualizar usuario
 */

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

/**
 * @swagger
 * /api/User/{id}:
 *   delete:
 *     summary: Elimina un usuario por su ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 */

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
