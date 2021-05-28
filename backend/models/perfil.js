let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

let perfilSchema = Schema({
  nombre: String,
  descripcion: String,
  fechaCreacion: { type: Date, default: Date.now },
  fechaModificacion: { type: Date, default: Date.now },
  estadoSistema: { type: Boolean, default: true },
});

module.exports = mongoose.model("perfil",perfilSchema);