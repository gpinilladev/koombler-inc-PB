let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

let estadoSchema = Schema({
  nombre: String,
  descripcion: String,
<<<<<<< HEAD

  fechaCreacion:{ type: Date, default: Date.now },
  fechaModificacion:{ type: Date, default: Date.now },
=======
  fechaCreacion: { type: Date, default: Date.now },
  fechaModificacion: { type: Date, default: Date.now },
>>>>>>> 36e82bb034cb46868b56d633a397bbecf218b8f2
});

module.exports=mongoose.model("estado", estadoSchema);

