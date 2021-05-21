let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

let estadoSolicitudSchema=Schema({
    idUsuario:{type:Schema.ObjectId,ref:"usuario"},
    idEstado:{type:Schema.ObjectId,ref:"estado"},
    fechaCreacion: Number,
    fechaModificacion: Number,
    observaciones:String,
});

module.exports = mongoose.model("estadoSolicitud", estadoSolicitudSchema);