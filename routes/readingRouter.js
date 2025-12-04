const express = require('express');
const router = express.Router();
const readingService = require('../services/readingService'); 

/**
 * @swagger
 * /api/Reading:
 *   get:
 *     summary: Obtiene todas las lecturas
 *     tags: [Reading]
 *     responses:
 *       200:
 *         description: Lista de lecturas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reading'
 *       500:
 *         description: Error al obtener lecturas
 */

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

/**
 * @swagger
 * /api/Reading/{idReading}:
 *   get:
 *     summary: Obtiene una lectura por ID
 *     tags: [Reading]
 *     parameters:
 *       - in: path
 *         name: idReading
 *         required: true
 *         description: ID de la lectura
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lectura encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reading'
 *       404:
 *         description: Lectura no encontrada
 */

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

/**
 * @swagger
 * /api/Reading:
 *   post:
 *     summary: Crea una nueva lectura
 *     tags: [Reading]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReadingInput'
 *     responses:
 *       201:
 *         description: Lectura creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reading'
 *       500:
 *         description: Error al crear lectura
 */

router.post('/', async (req, res) => {
    try {
        const createdReading = await readingService.create(req.body);
        res.status(201).json(createdReading);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/Reading/{id}:
 *   patch:
 *     summary: Actualiza una lectura por ID
 *     tags: [Reading]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la lectura
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReadingPatchInput'
 *     responses:
 *       200:
 *         description: Lectura actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reading'
 *       404:
 *         description: Lectura no encontrada
 *       500:
 *         description: Error del servidor
 */

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

/**
 * @swagger
 * /api/Reading/{id}:
 *   delete:
 *     summary: Elimina una lectura por ID
 *     tags: [Reading]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la lectura
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lectura eliminada
 *       404:
 *         description: Lectura no encontrada
 */
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
