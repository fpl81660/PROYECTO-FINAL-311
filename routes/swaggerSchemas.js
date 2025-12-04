/**
 * @swagger
 * components:
 *   schemas:
 *     Device:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID generado por MongoDB
 *         serialNumber:
 *           type: string
 *           description: Número de serie único
 *         model:
 *           type: string
 *           description: Modelo del dispositivo
 *         ownerId:
 *           type: string
 *           description: ID del usuario propietario
 *         zoneId:
 *           type: string
 *           description: ID de la zona asignada
 *         installedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de instalación
 *         status:
 *           type: string
 *           enum: [active, maintenance, offline]
 *           description: Estado del dispositivo
 *         sensors:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de IDs de sensores
 *       example:
 *         id: "674b3cc97e52f0707b615a99"
 *         serialNumber: "DVC-A9001"
 *         model: "GW-PRO-V1"
 *         ownerId: "674b3cc97e52f0707b615a10"
 *         zoneId: "674b3cc97e52f0707b615a15"
 *         installedAt: "2024-01-15T10:00:00Z"
 *         status: "active"
 *         sensors: ["674b3cc97e52f0707b615a20"]
 *
 *     DeviceInput:
 *       type: object
 *       required:
 *         - serialNumber
 *         - model
 *         - ownerId
 *         - zoneId
 *       properties:
 *         serialNumber:
 *           type: string
 *           description: Número de serie único
 *         model:
 *           type: string
 *           description: Modelo del dispositivo
 *         ownerId:
 *           type: string
 *           description: ID del usuario propietario
 *         zoneId:
 *           type: string
 *           description: ID de la zona
 *         sensors:
 *           type: array
 *           items:
 *             type: string
 *           description: IDs de sensores a vincular
 *       example:
 *         serialNumber: "DVC-B2025"
 *         model: "GW-LITE-V2"
 *         ownerId: "674b3cc97e52f0707b615a10"
 *         zoneId: "674b3cc97e52f0707b615a15"
 *         sensors: []
 *
 *     DevicePatchInput:
 *       type: object
 *       properties:
 *         serialNumber:
 *           type: string
 *         model:
 *           type: string
 *         ownerId:
 *           type: string
 *         zoneId:
 *           type: string
 *         status:
 *           type: string
 *           enum: [active, maintenance, offline]
 *         sensors:
 *           type: array
 *           items:
 *             type: string
 *       example:
 *         serialNumber: "DVC-A9001-UPDATED"
 *         model: "GW-PRO-V2"
 *         ownerId: "674b3cc97e52f0707b615a10"
 *         zoneId: "674b3cc97e52f0707b615a16"
 *         status: "maintenance"
 *         sensors: ["674b3cc97e52f0707b615a22"]
 *
 *     Zone:
 *       type: object
 *       properties:
 *         id:
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
 *           description: Estado de la zona
 *       example:
 *         id: "674b3cc97e52f0707b615a15"
 *         name: "Zona Norte"
 *         description: "Almacén principal"
 *         isActive: true
 *
 *     ZoneInput:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre de la zona
 *         description:
 *           type: string
 *           description: Descripción de la zona
 *         isActive:
 *           type: boolean
 *           description: Estado de la zona
 *       example:
 *         name: "Zona Sur"
 *         description: "Área de descarga"
 *         isActive: true
 *
 *     ZonePatchInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         isActive:
 *           type: boolean
 *       example:
 *         name: "Zona Sur Actualizada"
 *         description: "Nueva descripción de la zona sur"
 *         isActive: false
 *
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID generado por MongoDB
 *         name:
 *           type: string
 *           description: Nombre completo
 *         email:
 *           type: string
 *           description: Correo electrónico
 *         password:
 *           type: string
 *           description: Contraseña (Hashed)
 *         role:
 *           type: string
 *           enum: [admin, technician, viewer]
 *           description: Rol del usuario
 *       example:
 *         id: "674b3cc97e52f0707b615a10"
 *         name: "Juan Pérez"
 *         email: "juan@example.com"
 *         password: "$2b$10$EixZaY"
 *         role: "admin"
 *
 *     UserInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre completo
 *         email:
 *           type: string
 *           description: Correo electrónico
 *         password:
 *           type: string
 *           description: Contraseña
 *         role:
 *           type: string
 *           enum: [admin, technician, viewer]
 *           description: Rol del usuario
 *       example:
 *         name: "Nuevo Usuario"
 *         email: "user@test.com"
 *         password: "securePassword123"
 *         role: "viewer"
 *
 *     UserPatchInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: [admin, technician, viewer]
 *       example:
 *         name: "Juan Pérez Actualizado"
 *         email: "juan.updated@example.com"
 *         password: "newSecurePassword123"
 *         role: "technician"
 *
 *     Sensor:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID generado por MongoDB
 *         type:
 *           type: string
 *           description: Tipo de sensor
 *         unit:
 *           type: string
 *           description: Unidad de medida
 *         model:
 *           type: string
 *           description: Modelo del sensor
 *         location:
 *           type: string
 *           description: Ubicación física
 *         isActive:
 *           type: boolean
 *           description: Estado del sensor
 *       example:
 *         id: "674b3cc97e52f0707b615a20"
 *         type: "Temperature"
 *         unit: "°C"
 *         model: "DHT22"
 *         location: "40.7128, -74.0060"
 *         isActive: true
 *
 *     SensorInput:
 *       type: object
 *       required:
 *         - type
 *         - location
 *       properties:
 *         type:
 *           type: string
 *           enum: [Temperature, Humidity, Co2, Noise]
 *           description: El tipo define la unidad automáticamente
 *         model:
 *           type: string
 *           description: Modelo del sensor
 *         location:
 *           type: string
 *           description: Formato lat, long
 *         isActive:
 *           type: boolean
 *           description: Estado del sensor
 *       example:
 *         type: "Humidity"
 *         model: "DHT11"
 *         location: "19.4326, -99.1332"
 *         isActive: true
 *
 *     SensorPatchInput:
 *       type: object
 *       properties:
 *         model:
 *           type: string
 *         location:
 *           type: string
 *         isActive:
 *           type: boolean
 *       example:
 *         model: "DHT22-V2"
 *         location: "20.5000, -90.5000"
 *         isActive: false
 *
 *     Reading:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID generado por MongoDB
 *         sensorId:
 *           type: string
 *           description: ID del sensor
 *         time:
 *           type: string
 *           format: date-time
 *           description: Fecha de la lectura
 *         value:
 *           type: number
 *           format: float
 *           description: Valor medido
 *       example:
 *         id: "674b3cc97e52f0707b615a50"
 *         sensorId: "674b3cc97e52f0707b615a20"
 *         time: "2025-01-01T12:00:00Z"
 *         value: 23.5
 *
 *     ReadingInput:
 *       type: object
 *       required:
 *         - sensorId
 *         - value
 *       properties:
 *         sensorId:
 *           type: string
 *           description: ID del sensor existente
 *         value:
 *           type: number
 *           format: float
 *           description: Valor de la lectura
 *       example:
 *         sensorId: "674b3cc97e52f0707b615a20"
 *         value: 45.5
 *
 *     ReadingPatchInput:
 *       type: object
 *       properties:
 *         value:
 *           type: number
 *           format: float
 *       example:
 *         value: 50.1
 */
