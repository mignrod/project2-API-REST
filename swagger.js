const swaggerAutogen = require('swagger-autogen')();

const isProduction = process.env.NODE_ENV === 'production';
const host = isProduction ? 'project2-api-rest.onrender.com' : 'localhost:3001';
const schemes = isProduction ? ['https'] : ['http'];

const doc = {
  info: {
    title: 'Tasks Manager API',
    description: 'Tasks Manager API by Mignrod'
  },
  host,
  schemes,
  securityDefinitions: {
    githubAuth: {
      type: 'oauth2',
      flow: 'accessCode',
      authorizationUrl: 'https://github.com/login/oauth/authorize',
      tokenUrl: 'https://github.com/login/oauth/access_token',
      scopes: {
        'read:user': 'Read user info'
      }
    }
  },
  security: [
    {
      githubAuth: ['read:user']
    }
  ]
};

const outputfile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json file
swaggerAutogen(outputfile, endpointsFiles, doc);
