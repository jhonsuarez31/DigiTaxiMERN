const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//Metadata sobre la API

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DigiTaxi – Prueba Backend",
      version: "1.0.0",
      description: "API documentation for my Node.js and Express application",
    },
    servers: [
      {
        url: "http://localhost:4001",
      },
    ],
  },
  apis: ["./routes/*.js"],
};


const specs = swaggerJSDoc(options);

module.exports = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
};
