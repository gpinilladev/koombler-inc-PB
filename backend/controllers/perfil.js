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
  module.exports = {
    registrarPerfil,
    listarPerfil,
    
  };
  