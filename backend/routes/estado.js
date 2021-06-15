let Estado = require("../controllers/estado");
let express = require("express");
// Creamos la api para controlar las rutas
let api = express.Router();
 
// Rutas de la API
api.post("/estado/registrarEstado", Estado.registrarEstado);
api.put("/estado/editarEstado/:id", Estado.editarEstado);
api.get("/estado/listarEstado", Estado.listarEstado);

api.post("/estado/:nombre?", Estado.listarEstado);

api.put("/estado/inactivarEstado/:id", Estado.inactivarEstado);
api.get("/estado/:id", Estado.buscarEstado);



module.exports = api;