'use strict';
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'AlkyBank Wallet', version: '1.0.0' },
  },
  apis: [
    './routes/categories.js', './database/models/category.js',
    './database/models/role.js',
    './routes/transactionRoute.js', './database/models/transaction.js',
    './routes/userRoute.js', './database/models/user.js'
  ]
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/docs/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(
    `Version docs are available on http://localhost:${port}/docs`
  );
};

module.exports = { swaggerDocs };
