let tipoIdentificacion = require("../models/tipoIdentificacion");

const listarTipoIdentificacion = (req, res) => {
    tipoIdentificacion.find({}, (err, datosTipoIdentificacion) => {
        if (err){
            res.status(500).send({ mensaje: "Error al conectar al servidor"});
        } else {
            if(datosTipoIdentificacion) {
                res.status(200).send({ tipoIdentificacion: datosTipoIdentificacion });
            } else {
                res.status(401).send({mensaje: "No hay tipos de identificación"});
            }
        }
    });
};

module.exports = {
    listarTipoIdentificacion,
};