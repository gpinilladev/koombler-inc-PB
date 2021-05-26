let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

let especialidadSchema = Schema({
  nombre: String,
  descripcion: String,
  fechaCreacion: { type: Date, default: Date.now },
  fechaModificacion: { type: Date, default: Date.now },
  idEstado: {type:Schema.ObjectId,ref:"estado"},
});

module.exports=mongoose.model("especialidad",especialidadSchema);