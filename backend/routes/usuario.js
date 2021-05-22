let express = require("express");
let Usuario = require("../controllers/usuario");
let api = express.Router();

api.post("/registrarUsuario", Usuario.registrarUsuario);

module.exports = api;