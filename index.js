const express = require("express");
const app = express();
const port = 3000;
const setupSwagger = require('./swagger');
const {logErrors, errorHandler} = require('./middleware/errorHandler');

app.use(express.json());
app.use(errorHandler); 
app.use(logErrors); 


setupSwagger(app);

app.get("/", (req, res) => {
  res.send("Hola como estas");
});

app.get("/nuevaruta", (req, res) => {
  res.send("Hola este es el segundo endpoint");
});

app.get('/error', (req,res,next)  => {
  next(new Error('Algo salio mal'))
})

app.listen(port, () => {
  console.log("My port is working on: "+ port);
});
 

//El enrutamiento es separar todas las rutas que estoy trabajando.
