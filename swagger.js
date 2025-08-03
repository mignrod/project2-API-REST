const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Tasks Manager API',
    description: 'Tasks Manager API by Mignrod'
  },
  host: 'project2-api-rest.onrender.com',
  schemes: ['https'],
  securityDefinitions: {
    GitHubOAuth: {
      type: 'oauth2',
      authorizationUrl: 'https://github.com/login/oauth/authorize',
      tokenUrl: 'https://github.com/login/oauth/access_token',
      flow: 'implicit',
      scopes: {
        'read:user': 'Read user info',
        'user:email': 'Access to user email'
      }
    }
  },
  security: [
    {
      GitHubOAuth: ['read:user', 'user:email']
    }
  ]
};

const outputfile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

const swaggerOptions = {
  oauthOptions: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    scopes: ['read:user', 'user:email'],
    usePkceWithAuthorizationCodeGrant: true,
    useBasicAuthenticationWithAccessCodeGrant: true,
    redirectUrl:
      'https://project2-api-rest.onrender.com/api-docs/oauth2-redirect.html'
  }
};

// Generate swagger.json file
swaggerAutogen(outputfile, endpointsFiles, doc, swaggerOptions);
