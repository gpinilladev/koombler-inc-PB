let express = require("express");
let Usuario = require("../controllers/usuario");
let api = express.Router();

api.post("/registrarUsuario", Usuario.registrarUsuario);
api.post("/login", Usuario.login);

module.exports = api;