let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let tipoIdentificacionSchema = Schema({
    idEstado: { type: Schema.ObjectId, ref: "estado" },
    nombre: String,
    descripcion: String,
    fechaCreacion: { type: Date, default: Date.now },
    fechaModificacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model("tipoIdentificacion", tipoIdentificacionSchema);