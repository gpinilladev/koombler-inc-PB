let TipoIdentificacion = require("../models/tipoIdentificacion");

const registrarTipoIdentificacion = (req, res) => {
    let params = req.body;
  
    let tipoIdentificacion = new TipoIdentificacion();
  
    tipoIdentificacion.nombre = params.nombre;
    tipoIdentificacion.descripcion = params.descripcion;
  
    tipoIdentificacion.save((err, saveTipoIdentificacion) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (saveTipoIdentificacion) {
          res.status(200).send({tipoIdentificacion : saveTipoIdentificacion });
        } else {
          res.status(401).send({ mensaje: "No se pudo registrar el tipo de identificacion" });
        }
      }
    });
};

const listarTipoIdentificacion = (req, res) => {
    let nombre = req.params["nombre"];
    TipoIdentificacion.find({ nombre: new RegExp(nombre, "i") }, (err, datosTipoIdentificacion) => {
        if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
        } else {
            if (datosTipoIdentificacion) {
                res.status(200).send({ tipoIdentificacion: datosTipoIdentificacion });
            } else {
                res.status(401).send({ mensaje: "No hay existe tipo de identificacion" });
            }
        }
    });
};

const buscarTipoIdentificacion = (req, res) => {
    let id = req.params["id"];
    TipoIdentificacion.findById({ _id: id }, (err, datosTipoIdentificacion) => {
        if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
        } else {
            if (datosTipoIdentificacion) {
                res.status(200).send({ tipoIdentificacion: datosTipoIdentificacion });
            } else {
                res.status(401).send({ mensaje: "El tipo de identificacion no existe" });
            }
        }
    });
};

const editarTipoIdentificacion = (req, res) => {
    let id = req.params["id"];
    let params = req.body;

    TipoIdentificacion.findByIdAndUpdate(
        { _id: id },
        { nombre: params.nombre, descripcion: params.descripcion },
        { fechaModificacion: Date.now() },
        (err, datosTipoIdentificacion) => {
            if (err) {
                res.status(500).send({ mensaje: "Error al conectar al servidor" });
            } else {
                if (datosTipoIdentificacion) {
                res.status(200).send({ tipoIdentificacion: datosTipoIdentificacion });
                } else {
                res.status(401).send({ mensaje: "El tipo de identificacion no se pudo editar" });
                }
            }
        }
    );
};

const inactivarTipoIdentificacion = (req, res) => {
    let params = req.body;
    TipoIdentificacion.findByIdAndUpdate(
        { _id: params.id },
        { estadoSistema: false },
        (err, datosTipoIdentificacion) => {
            if (err) {
                res.status(500).send({ mensaje: "Error en el servidor" });
            } else {
                if (datosTipoIdentificacion) {
                    res.status(200).send({ tipoIdentificacion: "Tipo de identificacion Inactivo" });
                } else {
                    res.status(403).send({ mensaje: "El tipo de identificacion no se pudo inactivar" });
                }
            }
        }
    );
};
  module.exports = {
    registrarTipoIdentificacion,
    listarTipoIdentificacion,
    buscarTipoIdentificacion,
    editarTipoIdentificacion,
    inactivarTipoIdentificacion,
  };
  