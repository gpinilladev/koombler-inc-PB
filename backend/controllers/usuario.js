let Usuario = require("../models/usuario");
let bcrypt = require("bcrypt-nodejs");
let jwt = require("../libs/jwt");


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

const login = (req, res) =>{
    let params = req.body;
    Usuario.findOne({ email: params.email }, (err, datosUsuario) =>{
        if (err) {
            res.status(500).send({ mensaje: "Error del servidor"});
        } else {
            if (datosUsuario) {
                bcrypt.compare(params.clave, datosUsuario.clave, (err, confirm) =>{
                    if (confirm) {
                        if (params.getToken) {
                            res.status(200).send({
                                jwt: jwt.createToker(datosUsuario),
                                user: datosUsuario,
                            });
                        } else {
                            res.status(200).send({ Usuario: datosUsuario, mensaje: "Sin token"});
                        }
                    } else {
                        res.status(401).send({mensaje: "Correo o Clave erronea"});
                    }
                });
            } else {
                res.status(401).send({mensaje: "Correo o Clave erronea"});
            }
        }
    });
};

module.exports ={
    registrarUsuario,
    login,
};