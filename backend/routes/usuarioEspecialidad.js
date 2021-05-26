let express = require("express");
let UsuarioEspecialidad = require("../controllers/usuarioEspecialidad");
let api = express.Router();

api.post("/usuarioEspecialidad/CrearEspecialidad",UsuarioEspecialidad.crearUsuarioEspecialidad)
api.get("/usuarioEspecialidad/:id",UsuarioEspecialidad.buscarUsuarioEspecialidad)
api.get("/usuarioEspecialidad/",UsuarioEspecialidad.listarUsuarioEspecialidad)
api.post("/usuarioEspecialidad/:nombre?",UsuarioEspecialidad.listarUsuarioEspecialidad)
api.put("/usuarioEspecialidad/editarespecialidad/:id",UsuarioEspecialidad.editarUsuarioEspecialidad)


module.exports = api;
