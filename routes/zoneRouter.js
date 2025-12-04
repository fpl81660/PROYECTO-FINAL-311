const express = require('express');
const router = express.Router();
const zoneService = require('../services/zoneService');

/**
 * @swagger
 * /api/Zone:
 *   get:
 *     summary: Obtiene todas las zonas
 *     tags: [Zone]
 *     responses:
 *       200:
 *         description: Lista de zonas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Zone'
 */

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


/**
 * @swagger
 * /api/Zone/{idZone}:
 *   get:
 *     summary: Obtiene una zona por ID
 *     tags: [Zone]
 *     parameters:
 *       - in: path
 *         name: idZone
 *         required: true
 *         description: ID de la zona
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Zona encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Zone'
 *       404:
 *         description: Zona no encontrada
 */

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


/**
 * @swagger
 * /api/Zone:
 *   post:
 *     summary: Crea una nueva zona
 *     tags: [Zone]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ZoneInput'
 *     responses:
 *       201:
 *         description: Zona creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Zone'
 */

router.post('/', async (req, res) => {
    try {
        const createdZone = await zoneService.create(req.body);
        res.status(201).json(createdZone);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/Zone/{id}:
 *   patch:
 *     summary: Actualiza una zona por ID
 *     tags: [Zone]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la zona
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ZonePatchInput'
 *     responses:
 *       200:
 *         description: Zona actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Zone'
 *       404:
 *         description: Zona no encontrada
 */
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

/**
 * @swagger
 * /api/Zone/{id}:
 *   delete:
 *     summary: Elimina una zona por ID
 *     tags: [Zone]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la zona
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Zona eliminada
 *       404:
 *         description: Zona no encontrada
 */
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
