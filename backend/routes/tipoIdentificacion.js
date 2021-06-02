let TipoIdentificacion = require("../controllers/tipoIdentificacion");
let express = require("express");

let api = express.Router();
 
api.post("/tipoIdentificacion/registrarTipoIdentificacion", TipoIdentificacion.registrarTipoIdentificacion);
api.get("/tipoIdentificacion/listaTipoIdentificaciones", TipoIdentificacion.listarTipoIdentificacion);
api.post("/tipoIdentificacion/:nombre?", TipoIdentificacion.listarTipoIdentificacion);
api.get("/tipoIdentificacion/:id", TipoIdentificacion.buscarTipoIdentificacion);
api.put("/tipoIdentificacion/editarTipoIdentificacion/:id", TipoIdentificacion.editarTipoIdentificacion);
api.put("/tipoIdentificacion/inactivarTipoIdentificacion/:id", TipoIdentificacion.inactivarTipoIdentificacion);

module.exports = api;