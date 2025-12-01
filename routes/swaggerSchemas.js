/**
 * @swagger
 * components:
 *   schemas:
 *     Zone:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID generado por MongoDB
 *         name:
 *           type: string
 *           description: Nombre de la zona
 *         description:
 *           type: string
 *           description: Descripción de la zona
 *         isActive:
 *           type: boolean
 *           description: Indica si la zona está activa o no
 *       required:
 *         - name
 *       example:
 *         _id: "654a3f932be12f45c2d3478a"
 *         name: "Zona Norte"
 *         description: "Zona destinada a envíos nacionales"
 *         isActive: true
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: ID del usuario
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *         email:
 *           type: string
 *           description: Correo electrónico único
 *         password:
 *           type: string
 *           description: Contraseña del usuario (hashed)
 *         role:
 *           type: string
 *           enum: [admin, technician, viewer]
 *           description: Rol del usuario
 *       example:
 *         id: "674bbcd31f404d9221a415e2"
 *         name: "Juan Pérez"
 *         email: "juan@example.com"
 *         password: "$2a$10$123456abcd"
 *         role: "admin"
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Sensor:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID del sensor
 *         type:
 *           type: string
 *           description: Tipo de sensor (ej temperatura, humedad, gas)
 *         unit:
 *           type: string
 *           description: Unidad de medida del sensor (ej °C, %, ppm)
 *         model:   
 *           type: string
 *           description: Modelo del sensor
 *         location:
 *           type: string
 *           description: Ubicación física del sensor
 *         isActive:
 *           type: boolean
 *           description: Indica si el sensor está activo
 *       example:
 *         id: "674bc3291f404d9b21a41a09"
 *         type: "Temperatura"
 *         unit: "°C"
 *         model: "DHT22"
 *         location: "Cuarto de servidores"
 *         isActive: true
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Reading:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "674b3cc97e52f0707b615a33"
 *         sensorId:
 *           type: string
 *           description: ID del sensor asociado
 *           example: "674b3cc97e52f0707b615a20"
 *         time:
 *           type: string
 *           format: date-time
 *           example: "2025-01-01T12:00:00Z"
 *         value:
 *           type: number
 *           example: 23.5
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Device:
 *       type: object
 *       properties:
 *         serialNumber:
 *           type: string
 *         model:
 *           type: string
 *         ownerId:
 *           type: string
 *           description: ID del usuario dueño del dispositivo
 *         zoneId:
 *           type: string
 *           description: ID de la zona donde está instalado
 *         installedAt:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *           enum: [active, maintenance, offline]
 *         sensors:
 *           type: array
 *           items:
 *             type: string
 */
