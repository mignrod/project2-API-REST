const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get(
  '/api-docs',
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      oauth2RedirectUrl:
        'https://project2-api-rest.onrender.com/api-docs/oauth2-redirect.html',
      initOAuth: {
        clientId: process.env.GITHUB_CLIENT_ID,
        scopes: ['read:user'],
        usePkceWithAuthorizationCodeGrant: true
      },
      persistAuthorization: true
    }
  })
);

module.exports = router;
