const express = require("express");
const app = express();

//nos ayuda a analizar el cuerpo de la solicitud POST
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//cargamos el archivo de rutas
app.use(require('./routes/expediente'));
app.use(require('./routes/estado_expediente'));
app.use(require('./routes/causante'));
app.use(require('./routes/instituciones'));
app.use(require('./routes/estadistica'));

app.listen(process.env.PORT||3300,() => {
    console.log("Servidor corriendo en el puerto 3300");
});

module.exports = app;

//subir servicio nodemon index.js