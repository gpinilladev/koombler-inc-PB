let DocumentoSolicitud = require("../models/documentoSolicitud");
let mongoose = require("mongoose");

const registrarDocumentoSolicitud = (req, res) => {
  let params = req.body;
  let documentoSolicitud = new DocumentoSolicitud();

  documentoSolicitud.idEstadoSolicitud = params.idEstadoSolicitud;
  documentoSolicitud.nombre= params.nombre,
  documentoSolicitud.descripcion = params.descripcion,
  documentoSolicitud.extensionArchivo = params.extensionArchivo,
  
  documentoSolicitud.save((err, saveDocumentoSolicitud) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (saveDocumentoSolicitud) {
        res.status(200).send({ documentoSolicitud: saveDocumentoSolicitud });
      } else {
        res.status(401).send({ mensaje: "No se pudo registrar el documento" });
      }
    }
  });
};

const editarDocumentoSolicitud = (req, res) => {
  let id = req.params["id"];
  let params = req.body;

  DocumentoSolicitud.findByIdAndUpdate(
    { _id: id },
    { nombre: params.nombre, descripcion: params.descripcion },
    { fechaModificacion: Date.now() },
    (err, datosDocumentoSolicitud) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (datosDocumentoSolicitud) {
          res.status(200).send({ documentoSolicitud: datosDocumentoSolicitud });
        } else {
          res.status(401).send({ mensaje: "El documentoSolicitud no se pudo editar" });
        }
      }
    }
  );
};

const listarDocumentoSolicitud = (req, res) => {
  let nombre = req.params["nombre"];

  DocumentoSolicitud.find({ nombre: new RegExp(nombre, "i") }, (err, DocumentoSolicitud) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (DocumentoSolicitud) {
        res.status(200).send({ documentoSolicitud: DocumentoSolicitud });
      } else {
        res.status(401).send({ mensaje: "No hay documentos" });
      }
    }
  });
};

const buscarDocumentoSolicitud = (req, res) => {
  let id = req.params["id"];
  DocumentoSolicitud.findById({ _id: id }, (err, DocumentoSolicitud) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (DocumentoSolicitud) {
        res.status(200).send({ estado: DocumentoSolicitud });
      } else {
        res.status(401).send({ mensaje: "El dicumento no existe" });
      }
    }
  });
};

const inactivarDocumentoSolicitud = (req, res) => {
  let params = req.body;
  DocumentoSolicitud.findByIdAndUpdate(
    { _id: params.id },
    { idEstadoSolicitud: params.idEstadoSolicitud },
    (err, datosDocumentoSolicitud) => {
      if (err) {
        res.status(500).send({ mensaje: "Error en el servidor" });
      } else {
        if (datosDocumentoSolicitud) {
          res.status(200).send({ estado: "documento Inactivo" });
        } else {
          res.status(403).send({ mensaje: "El documento no se pudo inactivar" });
        }
      }
    }
  );
};

const documentoSolicitudController = {
    registrarDocumentoSolicitud,
    listarDocumentoSolicitud,
    buscarDocumentoSolicitud,
    editarDocumentoSolicitud,
    inactivarDocumentoSolicitud,
}
module.exports = documentoSolicitudController;

