const express = require('express');
const router = express.Router();
const deviceService = require('../services/deviceService');


/**
 * @swagger
 * /api/Device:
 *   get:
 *     summary: Obtiene todos los dispositivos
 *     tags: [Device]
 *     responses:
 *       200:
 *         description: Lista de dispositivos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Device'
 *       500:
 *         description: Error del servidor
 */

router.get('/', async (req, res) => {
    try {
        const device = await deviceService.getAll();
        res.status(200).json(device);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los device",
            error: error.message
        });
    }
});


/**
 * @swagger
 * /api/Device/{idDevice}:
 *   get:
 *     summary: Obtiene un dispositivo por ID
 *     tags: [Device]
 *     parameters:
 *       - in: path
 *         name: idDevice
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del dispositivo
 *     responses:
 *       200:
 *         description: Dispositivo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 *       404:
 *         description: Dispositivo no encontrado
 */


router.get('/:idDevice', async (req, res) => {
    try {
        const { idDevice } = req.params;
        const device = await deviceService.getById(idDevice);
        if (!device) {
            return res.status(404).json({ message: "Device no encontrado" });
        }
        res.json(device);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});


/**
 * @swagger
 * /api/Device:
 *   post:
 *     summary: Crea un nuevo dispositivo
 *     tags: [Device]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeviceInput'
 *     responses:
 *       201:
 *         description: Dispositivo creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 *       500:
 *         description: Error del servidor
 */


router.post('/', async (req, res) => {
    try {
        const createdDevice = await deviceService.create(req.body);
        res.status(201).json(createdDevice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



/**
 * @swagger
 * /api/Device/{id}:
 *   patch:
 *     summary: Actualiza un dispositivo por ID
 *     tags: [Device]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del dispositivo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DevicePatchInput'
 *     responses:
 *       200:
 *         description: Dispositivo actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 *       404:
 *         description: Dispositivo no encontrado
 *       500:
 *         description: Error del servidor
 */




router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedDevice = await deviceService.update(id, req.body);
        res.status(200).json(updatedDevice);
    } catch (error) {
        if (error.message === 'Device Not Found') {
            return res.status(404).json({ message: error.message });
        }

        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/Device/{id}:
 *   delete:
 *     summary: Elimina un dispositivo por ID
 *     tags: [Device]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dispositivo eliminado
 *       404:
 *         description: Dispositivo no encontrado
 */

    
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deviceService.delete(id);
        res.json({
            message: "Device deleted",
            result
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;
