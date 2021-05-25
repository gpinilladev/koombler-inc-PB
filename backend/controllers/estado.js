
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
  
  
const editarEstado = (req, res) => {
  
  let id = req.params["id"];
  let params = req.body;
  
  Estado.findByIdAndUpdate(
    { _id: id },
    
    { nombre: params.nombre, descripcion: params.descripcion},
    {fechaModificacion:Date.now()},
    (err, datosEstado) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (datosEstado) {
          res.status(200).send({ estado: datosEstado });
        } else {
          res.status(401).send({ mensaje: "El estado no se pudo editar" });
        }
      }
    }
  );
};


module.exports = {
    registrarEstado,
    editarEstado,
    inactivarEstado,
    
  };
  
  

    


