// Variable Mongoose
let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

let usuarioSchema = Schema({
    idEstado: { type: Schema.ObjectId, ref: "estado" },
    idPerfil: { type: Schema.ObjectId, ref: "perfil" },
    tipoIdentificacion: { type: Schema.ObjectId, ref: "tipoIdentificacion" },
    nombres: String,
    apellidos: String,
    telefono: String,
    direccion: String,
    numIdentificacion: String,
    email: String,
    fechaNacimiento: Number,
    clave: String,
    fechaCreacion: { type: Date, default: Date.now },
    fechaModificacion: { type: Date, default: Date.now },
    estadoSistema: { type: Boolean, default: true },
});

module.exports = mongoose.model("usuario",usuarioSchema);