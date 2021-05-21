let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

let perfilSchema = Schema({
  nombre: String,
  descripcion: String,
  fechaCreacion: Number,
  fechaModificacion: Number,
});

module.exports=mongoose.model("perfil",perfilSchema);