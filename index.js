const express = require("express");
const app = express();
const port = 3000;
const setupSwagger = require('./swagger');
const { logErrors, errorHandler } = require('./middleware/errorHandler');
const cors = require('cors');
const Zone = require('./routes/zoneRouter');
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());

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

app.use('/api/Zone', Zone);

app.use(logErrors);
app.use(errorHandler);

mongoose.connect(
  process.env.MONGO_URI ||'mongodb+srv://ferchoperezlopez10_db_user:REMOVED_SECRET@proyecto-final.jtiaido.mongodb.net/?retryWrites=true&w=majority&appName=proyecto-final')
    .then(()=>console.log('Connected to DB'))
    .catch((err)=>console.log(err))

app.listen(port, () => {
  console.log("My port is working on: " + port);
});
