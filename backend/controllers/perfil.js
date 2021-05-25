let Perfil = require("../models/perfil");

const registrarPerfil = (req, res) => {
    let params = req.body;
  
    let perfil = new Perfil();
  
    perfil.nombre = params.nombre;
    perfil.descripcion = params.descripcion;
  
    estado.save((err, savePerfil) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (savePerfil) {
          res.status(200).send({ estado: savePerfil });
        } else {
          res.status(401).send({ mensaje: "No se pudo registrar el perfil" });
        }
      }
    });
  };

  const listarPerfil = (req, res) => {
    let nombre = req.params["nombre"];
  
    Perfil.find({ nombre: new RegExp(nombre, "i") }, (err, datosPerfil) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (datosPerfil) {
          res.status(200).send({ perfil: datosPerfil });
        } else {
          res.status(401).send({ mensaje: "No hay perfil" });
        }
      }
    });
  };
  const buscarPerfil = (req, res) => {
    let id = req.params["id"];
    Perfil.findById({ _id: id }, (err, datosPerfil) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (datosEstado) {
          res.status(200).send({ estado: datosPerfil });
        } else {
          res.status(401).send({ mensaje: "El perfil no existe" });
        }
      }
    });
  };
  const editarPerfil = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
  
    Perfil.findByIdAndUpdate(
      { _id: id },
      { nombre: params.nombre, descripcion: params.descripcion },
      { fechaModificacion: Date.now() },
      (err, datosPerfil) => {
        if (err) {
          res.status(500).send({ mensaje: "Error al conectar al servidor" });
        } else {
          if (datosPerfil) {
            res.status(200).send({ estado: datosEstado });
          } else {
            res.status(401).send({ mensaje: "El perfil no se pudo editar" });
          }
        }
      }
    );
  };
  
  module.exports = {
    registrarPerfil,
    listarPerfil,
    buscarPerfil,
    editarPerfil,
    
  };
  