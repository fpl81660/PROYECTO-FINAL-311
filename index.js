const express = require("express");
const app = express();
const port = 3000;
const setupSwagger = require('./swagger');

app.use(express.json());


setupSwagger(app);

app.get("/", (req, res) => {
  res.send("Hola como estas");
});

app.get("/nuevaruta", (req, res) => {
  res.send("Hola este es el segundo endpoint");
});

app.use(express.json());

app.listen(port, () => {
  console.log("My port is working on: "+ port);
});

//El enrutamiento es separar todas las rutas que estoy trabajando.
