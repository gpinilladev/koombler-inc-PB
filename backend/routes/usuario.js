let express = require("express");
let Usuario = require("../controllers/usuario");
let api = express.Router();

api.post("usuario/registrarUsuario", Usuario.registrarUsuario);
api.post("/login", Usuario.login);
api.put("/usuario/editarUsuario/:id", Usuario.editarUsuario);
api.put("/usuario/inactivarUsuario/:id", Usuario.inactivarUsuario);
api.get("/usuario/:nombres?", Usuario.listarUsuario);
api.post("/usuario/:nombres?", Usuario.listarUsuario);


module.exports = api;