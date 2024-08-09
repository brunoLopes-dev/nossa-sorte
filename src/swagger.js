const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API de Rifa Nossa Sorte',
        version: '1.1.0',
        description: 'Esta é a API para gerenciamento de rifas.',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor de Desenvolvimento'
        }
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec
};
