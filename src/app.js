const express = require("express");

const { auth } = require("express-oauth2-jwt-bearer");
const errorHandler = require("./middlewares/errorHandler");


require('dotenv').config();

// Configuracion Middleware con el Servidor de Autorización 
const autenticacion = auth({
  audience: process.env.OAUTH_AUDIENCE,
  issuerBaseURL: process.env.OAUTH_URL,
  tokenSigningAlg: "RS256",
});


const app = express();
app.use(express.json());

// Importamos el Router de Libros
const librosRouter = require("./routes/libros");

//Configuramos el middleware de autenticacion
app.use("/api/libros", autenticacion,  librosRouter);

app.use(errorHandler);

// Ruta del nuevo endpoint
app.get('/api/nuevo-endpoint', (req, res) => {
  // Lógica del endpoint
  const respuesta = {
    mensaje: '¡Hola! Este es el nuevo endpoint.',
    fecha: new Date(),
  };

  // Enviar la respuesta como JSON
  res.json(respuesta);
});

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});

module.exports = app;