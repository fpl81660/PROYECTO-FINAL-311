const express = require("express");
const app = express();
const port = 3000;
const setupSwagger = require('./swagger');
const { logErrors, errorHandler } = require('./middleware/errorHandler');
const bodyParser = require('body-parser');
const cors = require('cors');
const Zone = require('./routes/zoneRouter');
const mongoose = require('mongoose');
app.use(express.json());

setupSwagger(app);

app.get("/", (req, res) => {
  res.send("Hola como estas");
});

app.get("/nuevaruta", (req, res) => {
  res.send("Hola este es el segundo endpoint");
});

app.get('/error', (req, res, next) => {
  next(new Error('Algo salio mal'))
});

app.use(errorHandler);
app.use(logErrors);

app.listen(port, () => {
  console.log("My port is working on: " + port);
});


app.use(cors());
app.use(bodyParser.json());
app.use('/api/Zone', Zone);
mongoose.connect(
    'mongodb+srv://ferchoperezlopez10_db_user:fer123@clusterservice311.vogy8ny.mongodb.net/?retryWrites=true&w=majority&appName=clusterservice311')
    .then(()=>console.log('Connected to DB'))
    .catch((err)=>console.log(err))


//El enrutamiento es separar todas las rutas que estoy trabajando.
//mongodb+srv://ferchoperezlopez10_db_user:REMOVED_SECRET@proyecto-final.jtiaido.mongodb.net/
