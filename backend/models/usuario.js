// Variable Mongoose
let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

let usuarioSchema= Schema({

idEstado:{type:Schema.ObjectId,ref:"estado"},
idPerfil:{type:Schema.ObjectId,ref:"perfil"},
nombres: String,
telefono:String,
direccion: String,
numIdentificacion:String,
email:String,
fechaCreacion:Number,
fechaModificacion:Number,
});

module.exports= mongoose.model("usuario",usuarioSchema);