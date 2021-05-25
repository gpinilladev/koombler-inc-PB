let Perfil = require("../controllers/perfil");
let express = require("express");

let api = express.Router();
 
api.post("/perfil/registrarPerfil", Perfil.registrarPerfil);
api.get("/perfil/:nombre?", Perfil.listarPerfil);
api.post("/perfil/:nombre?", Perfil.listarPerfil);
