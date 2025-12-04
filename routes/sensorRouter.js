const express = require('express');
const router = express.Router();
const sensorService = require('../services/sensorService'); 


/**
 * @swagger
 * /api/Sensor:
 *   get:
 *     summary: Obtiene todos los sensores
 *     tags: [Sensor]
 *     responses:
 *       200:
 *         description: Lista de sensores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sensor'
 *       500:
 *         description: Error al obtener los sensores
 */

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

/**
 * @swagger
 * /api/Sensor/{idSensor}:
 *   get:
 *     summary: Obtiene un sensor por su ID
 *     tags: [Sensor]
 *     parameters:
 *       - in: path
 *         name: idSensor
 *         required: true
 *         description: ID del sensor
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sensor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sensor'
 *       404:
 *         description: Sensor no encontrado
 */
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

/**
 * @swagger
 * /api/Sensor:
 *   post:
 *     summary: Crea un nuevo sensor
 *     tags: [Sensor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SensorInput'
 *     responses:
 *       201:
 *         description: Sensor creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sensor'
 *       500:
 *         description: Error al crear el sensor
 */

router.post('/', async (req, res) => {
    try {
        const createdSensor = await sensorService.create(req.body);
        res.status(201).json(createdSensor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/Sensor/{id}:
 *   patch:
 *     summary: Actualiza un sensor por su ID
 *     tags: [Sensor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del sensor
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SensorPatchInput'
 *     responses:
 *       200:
 *         description: Sensor actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sensor'
 *       404:
 *         description: Sensor no encontrado
 *       500:
 *         description: Error al actualizar el sensor
 */

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

/**
 * @swagger
 * /api/Sensor/{id}:
 *   delete:
 *     summary: Elimina un sensor por su ID
 *     tags: [Sensor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del sensor
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sensor eliminado
 *       404:
 *         description: Sensor no encontrado
 */

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