let Estado = require("../controllers/estado");
let express = require("express");
// Creamos la api para controlar las rutas
let api = express.Router();
 
// Rutas de la API
api.post("/estado/registrarEstado", Estado.registrarEstado);
module.exports = api;