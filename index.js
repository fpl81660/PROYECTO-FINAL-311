const express = require("express");
const app = express();
const port = 3000;
const setupSwagger = require('./swagger');
const { logErrors, errorHandler } = require('./middleware/errorHandler');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const routerApi = require("./routes/rutas");

app.use(express.json());
app.use(cors());

setupSwagger(app);

app.get("/", (req, res) => {
  res.send("Hola como estas");
});

app.get("/nuevaruta", (req, res) => {
  res.send("Hola este es el segundo endpoint");
});


routerApi(app);

app.use(logErrors);
app.use(errorHandler);

mongoose.connect(
  process.env.MONGO_URI)
    .then(()=>console.log('Connected to DB'))
    .catch((err)=>console.log(err))

app.listen(port, () => {
  console.log("My port is working on: " + port);
});
