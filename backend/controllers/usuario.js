let Usuario = require("../models/usuario");
let bcrypt = require("bcrypt-nodejs");

const registrarUsuario = (req, res) => {
    let params = req.body;
    let usuario = new Usuario();
    if (
        params.nombres &&
        params.telefono &&
        params.direccion &&
        params.numIdentificacion &&
        params.email &&
        params.fechaNacimiento &&
        params.clave
    )    {
        bcrypt.hash(params.clave, null, null, (err, hash) => {
            if (hash) {
                usuario.nombres = params.nombres;
                usuario.telefono = params.telefono;
                usuario.direccion = params.direccion;
                usuario.numIdentificacion = params.numIdentificacion;
                usuario.email = params.email;
                usuario.fechaNacimiento = params.fechaNacimiento;
                usuario.clave = hash;
                
                usuario.save((err, saveUsuario) => {
                    if (err) {
                        res.status(500).send({ err: "No se registro el usuario"});
                    } else {
                        res.status(200).send({ usuario: saveUsuario });
                    }
                });
            }
        });
    } else {
        res.status(405).send({ err: "No se guardo un dato" });
    }
};

module.exports ={
    registrarUsuario,
};