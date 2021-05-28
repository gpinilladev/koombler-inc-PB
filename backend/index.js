let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

let port = process.env.PORT || 3001;

let app = express();

let usuarioRoutes = require("./routes/usuario");
let Estado = require("./routes/estado");
let Perfil = require("./routes/perfil");
let Solicitud = require("./routes/solicitud");
let DocumentoSolicitud = require("./routes/documentoSolicitud");
app.listen(port, () => {
  console.log("Servidor Backend funcionando en el puerto :", port);
});

mongoose.connect("mongodb://localhost:27017/bleringappdb", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }).then(() => {
    console.log("Conexion con MongoDB: ON");
  }).catch((err) => { 
    console.log("Conexion a MongoDB: OFF");
  });

// Analizar la codificacion de las url
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", Estado);
app.use("/api", usuarioRoutes);
app.use("/api", Perfil);
app.use("/api", Solicitud);
app.use("/api", DocumentoSolicitud);
app.use((req, res, next) => {
  res.header("Content-Type: application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

module.exports = app;