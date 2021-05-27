let estadoSolicitud = require("../models/estadoSolicitud");

const registrarEstadoSolicitud = (req, res) => {
  let params = req.body;

  let estadoSolicitud = new EstadoSolicitud();

  estadoSolicitud.idUsuario = params.idUsuario;
  estadoSolicitud.observaciones=observaciones.params;




  estadoSolicitud.save((err, saveEstadoSolicitud) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (saveEstadoSolicitud) {
        res.status(200).send({ estado: saveEstadoSolicitud });
      } else {
        res.status(401).send({ mensaje: "No se pudo registrar el estado de la Solicitud" });
      }
    }
  });
};

const editarEstadoSolicitud = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
  
    estadosSolicitud.findByIdAndUpdate(
      { _id: id },
      { observaciones: params.observaciones },
      { fechaModificacion: Date.now() },
      (err, datosEstadoSolicitud) => {
        if (err) {
          res.status(500).send({ mensaje: "Error al conectar al servidor" });
        } else {
          if (datosdatosEstadoSolicitud) {
            res.status(200).send({ estado: datosEstadoSolicitud});
          } else {
            res.status(401).send({ mensaje: "No se pudo editar el estado de la solicitud" });
          }
        }
      }
    );
  };

module.exports = {
    registrarEstadoSolicitud,
    editarEstadoSolicitud,

  };
  
