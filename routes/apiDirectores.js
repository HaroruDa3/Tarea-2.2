const express = require("express");
const apiDirectores = express();
const {getDirectores,getDirectorById,createDirector,updateDirector,
    deleteDirector} = require('../controllers/apiDirectoresController.js');

apiDirectores.get('', getDirectores);
apiDirectores.get('/:id', getDirectorById);
apiDirectores.post('', createDirector);
apiDirectores.put('/:id', updateDirector);
apiDirectores.delete('/:id', deleteDirector);
module.exports = apiDirectores;