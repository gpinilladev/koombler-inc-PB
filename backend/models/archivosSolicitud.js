let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let archivosSolicitudSchema = Schema({
  idEstadoSolicitud: { type: Schema.ObjectId, ref: "estadoSolicitud" },
  nombre: String,
  descripcion: String,
  extensionArchivo: String,
  fechaCreacion: { type: Date, default: Date.now },
  fechaModificacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model("archivosSolicitud", archivosSolicitudSchema);
