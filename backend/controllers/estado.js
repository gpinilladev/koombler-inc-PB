
// importamos el controlador de estado
let Estado = require("../models/estado");


const registrarEstado = (req, res) => {
   
    let params = req.body;
   
    let estado = new Estado();
    
    estado.nombre = params.nombre;
    estado.descripcion = params.descripcion;
   
    estado.save((err, saveEstado) => {
        
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (saveEstado) {
          res.status(200).send({ estado: saveEstado });
        } else {
          res.status(401).send({ mensaje: "No se pudo registrar el estado" });
        }
      }
    });
  };
  

module.exports = {
    registrarEstado,
  };
  

    


