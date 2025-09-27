const swaggerJsdoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'University CRUD API',
    version: '1.0.0',
    description: 'A comprehensive API for managing university students and courses with authentication',
    contact: {
      name: 'API Support',
      email: 'support@university.com'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 5000}`,
      description: 'Development server'
    },
    {
      url: 'https://api.university.com',
      description: 'Production server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token obtained from /api/auth/signin'
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};

const swaggerOptions = {
  definition: swaggerDefinition,
  apis: [
    './src/modules/routers/*.js',
    './docs/schemas/*.js'
  ]
};

const swaggerUIOptions = {
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info { margin: 20px 0; }
    .swagger-ui .info .title { color: #3b4151; }
  `,
  customSiteTitle: 'University CRUD API Documentation',
  customfavIcon: '/assets/favicon.ico',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    showExtensions: true,
    showCommonExtensions: true
  }
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = {
  swaggerSpec,
  swaggerUIOptions
};