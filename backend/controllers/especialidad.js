const especialidad = require("../models/especialidad");
let Especialidad = require("../models/especialidad");

const CrearEspecialidad = (req, res) => {
  let params = req.body;
  let especialidad = new Especialidad();
  especialidad.nombre = params.nombre;
  especialidad.descripcion = params.descripcion;

  especialidad.save((err, guardarEspecialidad) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (guardarEspecialidad) {
        res.status(200).send({ especialidad: guardarEspecialidad });
      } else {
        res.status(401).send({ mensaje: "No se pudo registrar la especialidad" });
      }
    }
  });
};

const buscarEspecialidad = (req, res) => {
    
    let id = req.params["id"];

    especialidad.findById({ _id: id }, (err, datosEspecialidad) => {

      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (datosEspecialidad) {
          res.status(200).send({ especialidad: datosEspecialidad });
        } else {
          res.status(401).send({ mensaje: "La especialidad no existe" });
        }
      }
    });
  };
  

  const listarEspecialidad = (req, res) => {

    let nombre = req.params["nombre"];

    especialidad.find({ nombre: new RegExp(nombre, "i") }, (err, datosEspecialidad) => {

      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (datosEspecialidad) {
          res.status(200).send({ especialidad: datosEspecialidad });
        } else {
          res.status(401).send({ mensaje: "No hay especialidads" });
        }
      }
    });
  };
  

  const editarespecialidad = (req, res) => {
 
    let id = req.params["id"];
 
    let params = req.body;
 
    especialidad.findByIdAndUpdate(
      { _id: id },
      { nombre: params.nombre, descripcion: params.descripcion },
      (err, datosEspecialidad) => {
        if (err) {
          res.status(500).send({ mensaje: "Error al conectar al servidor" });
        } else {
          if (datosEspecialidad) {
            res.status(200).send({ especialidad: datosEspecialidad });
          } else {
            res.status(401).send({ mensaje: "La categoría no se pudo editar" });
          }
        }
      }
    );
  };
  

  const eliminarespecialidad = (req, res) => {

    let id = req.params["id"];

    especialidad.findByIdAndDelete({ _id: id }, (err, datosEspecialidad) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (datosEspecialidad) {
          res.status(200).send({ especialidad: datosEspecialidad });
        } else {
          res.status(401).send({ mensaje: "La categoría no se pudo eliminar" });
        }
      }
    });
  };

module.exports = {
    CrearEspecialidad,
    buscarEspecialidad,
    editarespecialidad,
    listarEspecialidad,
    eliminarespecialidad
};
