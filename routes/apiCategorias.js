const express = require("express");
const apiCategorias = express();
const {
  getCategorias,getCategoriaById,createCategoria,updateCategoria,deleteCategoria
} = require('../controllers/apiCategoriasController.js');

apiCategorias.get('', getCategorias);
apiCategorias.get('/:id', getCategoriaById);
apiCategorias.post('', createCategoria);
apiCategorias.put('/:id', updateCategoria);
apiCategorias.delete('/:id', deleteCategoria);
module.exports = apiCategorias;
