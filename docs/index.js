const swaggerUi = require('swagger-ui-express');
const { swaggerSpec, swaggerUIOptions } = require('./swaggerConfig');

const setupSwagger = (app) => {
  // Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUIOptions));
  
  // Swagger JSON endpoint
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // Root endpoint with API info
  app.get('/', (req, res) => {
    res.json({
      name: 'University CRUD API',
      version: '1.0.0',
      description: 'A comprehensive API for managing university students and courses',
      documentation: `${req.protocol}://${req.get('host')}/api-docs`,
      swagger_json: `${req.protocol}://${req.get('host')}/api-docs.json`,
      endpoints: {
        authentication: '/api/auth',
        students: '/api/students',
        courses: '/api/courses'
      }
    });
  });
  
};

module.exports = setupSwagger;