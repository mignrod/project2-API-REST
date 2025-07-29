const swaggerAutogen = require('swagger-autogen');

const doc = {
  info: {
    title: 'Tasks Manager API',
    description: 'Tasks Manager API by Mignrod'
  },
  host: 'localhost:3001',
  schemes: ['http', 'https']
};

const outputfile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json file
swaggerAutogen(outputfile, endpointsFiles, doc);
