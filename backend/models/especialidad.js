let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

let especialidadSchema = Schema({
  nombre: String,
  descripcion: String,
  fechaCreacion: Number,
  fechaModificacion: Number,
});

module.exports=mongoose.model("especialidad",especialidadSchema);