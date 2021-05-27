let express = require("express");
let tipoIdentificacion = require("../controllers/tipoIdentificacion");
let api = express.Router();

api.get("/usuario/tipoIdentificacion", tipoIdentificacion.listarTipoIdentificacion);


module.exports = api;