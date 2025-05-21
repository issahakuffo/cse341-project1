const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info:{
        title: 'Users & Contacts Api',
        description: 'Api for Users and Contacts'
    },
    host: 'localhost:3000',
    schemes: ['http']
};


const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);