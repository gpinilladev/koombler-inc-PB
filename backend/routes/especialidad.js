let express = require("express");
let Especialidad  = require("../controllers/especialidad");
let api = express.Router();

api.post("/especialidad/CrearEspecialidad",Especialidad.crearEspecialidad);
api.get("/especialidad/:id",Especialidad.buscarEspecialidad);
api.get("/especialidad/",Especialidad.listarEspecialidad);
api.post("/especialidad/:nombre?",Especialidad.listarEspecialidad);
api.put("/especialidad/editarespecialidad/:id",Especialidad.editarEspecialidad);
api.put("/especialidad/activarInactivarEspecialidad/:id",Especialidad.activarInactivarEspecialidad)
//api.delete("especialidad/eliminarespecialidad/:id",Especialidad.eliminarespecialidad);

module.exports= api;