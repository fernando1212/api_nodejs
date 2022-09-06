const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const getsolicitudes = (request, response) => {
    connection.query("SELECT * FROM solicitudes", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

//ruta
app.route("/solicitudes")
.get(getsolicitudes);


const postsolicitudes = (request, response) => {
    const {plato, descripcion, precio, disponible} = request.body;
    connection.query("INSERT INTO solicitudes(plato, descripcion, precio, disponible) VALUES (?,?,?,?) ", 
    [plato, descripcion, precio, disponible],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Item añadido correctamente": results.affectedRows});
    });
};

//ruta
app.route("/solicitudes")
.post(postsolicitudes);


const delsolicitudes = (request, response) => {
    const id = request.params.id;
    connection.query("Delete from solicitudes where id = ?", 
    [id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Item eliminado":results.affectedRows});
    });
};

//ruta
app.route("/solicitudes/:id")
.delete(delsolicitudes);


module.exports = app;

