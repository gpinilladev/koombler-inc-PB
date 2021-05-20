let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

let usuarioEspecialidadSchema = Schemma({
  idUsuario: { type: Schema.ObjectId, ref: "usuario" },
  idEspecialidad: { type: Schema.ObjectId, ref: "especialidad" },
  fechaCreacion: Number,
  fechaModificacion: Number,
});

module.exports = mongoose.model("usuarioEspecialidad", usuarioEspecialidadSchema);