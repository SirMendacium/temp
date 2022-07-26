require("dotenv").config();
const mongoConnection = require("./db");


const express = require('express')
const app = express()
const PORT = 3000

const routes = require("./routes");


mongoConnection();
app.use(express.json());
app.use(routes);


app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}!`));
