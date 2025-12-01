/**
 * @swagger
 * components:
 *   schemas:
 *     Device:
 *       type: object
 *       properties:
 *         serialNumber:
 *           type: string
 *           description: Número de serie único del dispositivo
 *         model:
 *           type: string
 *           description: Modelo del dispositivo (ej. Gateway-001)
 *         ownerId:
 *           type: string
 *           description: ID del usuario dueño del dispositivo
 *         zoneId:
 *           type: string
 *           description: ID de la zona donde está instalado
 *         installedAt:
 *           type: string
 *           format: date
 *           description: Fecha de instalación
 *         status:
 *           type: string
 *           enum: [active, maintenance, offline]
 *           description: Estado actual del dispositivo
 *         sensors:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de IDs de los sensores asociados
 *       required:
 *         - serialNumber
 *         - model
 *       example:
 *         serialNumber: "DVC-A9001"
 *         model: "GW-PRO-V1"
 *         ownerId: "674b3cc97e52f0707b615a10"
 *         zoneId: "674b3cc97e52f0707b615a15"
 *         installedAt: "2024-01-15"
 *         status: "active"
 *         sensors: ["674b3cc97e52f0707b615a20", "674b3cc97e52f0707b615a21"]
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Zone:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID generado por MongoDB
 *         name:
 *           type: string
 *           description: Nombre de la zona (ej. "Cuarto Frío 1")
 *         description:
 *           type: string
 *           description: Descripción detallada de la zona
 *         isActive:
 *           type: boolean
 *           description: Indica si la zona está activa o no
 *       required:
 *         - name
 *       example:
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
 *       properties:
 *         id:
 *           type: string
 *           description: ID generado por MongoDB
 *         name:
 *           type: string
 *           description: Nombre completo del usuario
 *         email:
 *           type: string
 *           description: Correo electrónico único del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario (hashed)
 *         role:
 *           type: string
 *           enum: [admin, technician, viewer]
 *           description: Rol o nivel de acceso del usuario
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       example:
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
 *           description: ID generado por MongoDB
 *         type:
 *           type: string
 *           description: Tipo de sensor (ej. "Temperatura", "Humedad")
 *         unit:
 *           type: string
 *           description: Unidad de medida del sensor (ej. "°C", "%", "ppm")
 *         model:
 *           type: string
 *           description: Modelo del sensor (ej. "DHT22")
 *         location:
 *           type: string
 *           description: Ubicación física dentro de una zona
 *         isActive:
 *           type: boolean
 *           description: Indica si el sensor está activo
 *       required:
 *         - type
 *         - unit
 *       example:
 *         type: "Temperatura"
 *         unit: "°C"
 *         model: "DHT22"
 *         location: "Cuarto de servidores"
 *         deviceId: "DVC-A9001"
 *         isActive: true
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Reading:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID generado por MongoDB
 *         sensorId:
 *           type: string
 *           description: ID del sensor que generó la lectura
 *         time:
 *           type: string
 *           format: date-time
 *           description: Marca de tiempo de la lectura
 *         value:
 *           type: number
 *           format: float
 *           description: Valor medido por el sensor
 *       required:
 *         - sensorId
 *         - time
 *         - value
 *       example:
 *         sensorId: "674b3cc97e52f0707b615a20"
 *         time: "2025-01-01T12:00:00Z"
 *         value: 23.5
 */
