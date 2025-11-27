const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info:{
        title: 'Documentacion de mi API',
        version: '1.0.0',
        description: 'Esta es la documentacion de mi API con Swagger',
    },
    servers:[
        {
            url: 'http://localhost:3000',
            description: 'Servidor de desarrollo'
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
module.exports = setupSwagger;