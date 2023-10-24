const express = require("express");
const apiGhibliPeliculas = express();
const { getPeliculas,getPeliculaById,createPelicula,updatePelicula,
    deletePelicula,asociarPeliculaACategoria} = require('../controllers/apiGhibliPeliculasController');

apiGhibliPeliculas.get('', getPeliculas);
apiGhibliPeliculas.get('/:id', getPeliculaById);
apiGhibliPeliculas.post('', createPelicula);
apiGhibliPeliculas.put('/:id', updatePelicula);
apiGhibliPeliculas.delete('/:id', deletePelicula);
apiGhibliPeliculas.post('/asociar/:peliculaID/:categoriaID', asociarPeliculaACategoria);
module.exports = apiGhibliPeliculas;