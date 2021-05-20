let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

let documentoSolicitudSchema = Schema({
  idEstadoSolicitud: { type: Schema.ObjectId, ref: "estadoSolicitud" },
  nombre: String,
  descripcion:String,
  fechaCreacion: Number,
  fechaModificacion: Number,
  extensionArchivo:String,
});

module.exports = mongoose.model("documentoSolicitud", documentoSolicitudSchema);
