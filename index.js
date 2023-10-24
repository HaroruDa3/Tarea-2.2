const express = require('express');
const app = express();

app.use(express.json());

const apiGhibliPeliculas = require('./routes/apiGhibliPeliculas.js');
app.use('/api/peliculas', apiGhibliPeliculas);

const apiDirectores = require('./routes/apiDirectores');
app.use('/api/directores', apiDirectores);

const apiCategorias=require('./routes/apiCategorias');
app.use('/api/categorias', apiCategorias);



app.listen(3000);