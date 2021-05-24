let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

let documentoSolicitudSchema = Schema({
  idEstadoSolicitud: { type: Schema.ObjectId, ref: "estadoSolicitud" },
  nombre: String,
  descripcion: String,
  extensionArchivo: String,
  fechaCreacion: { type: Date, default: Date.now },
  fechaModificacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model("documentoSolicitud", documentoSolicitudSchema);
