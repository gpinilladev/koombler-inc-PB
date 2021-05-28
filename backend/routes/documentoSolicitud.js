let DocumentoSolicitud = require("../controllers/documentoSolicitud");
let express = require("express");
let api = express.Router();

// Rutas de la API
api.post("/documentoSolicitud/registrarDocumentoSolicitud", DocumentoSolicitud.registrarDocumentoSolicitud);
api.put("/documentoSolicitud/editarDocumentoSolicitud/:id", DocumentoSolicitud.editarDocumentoSolicitud);
api.put("/documentoSolicitud/inactivarDocumentoSolicitud",  DocumentoSolicitud.inactivarDocumentoSolicitud);
api.get("/documentoSolicitud/:id", DocumentoSolicitud.buscarDocumentoSolicitud);
api.get("/documentoSolicitud/:nombre?", DocumentoSolicitud.listarDocumentoSolicitud);
api.post("/documentoSolicitud/:nombre?", DocumentoSolicitud.listarDocumentoSolicitud);
module.exports = api;