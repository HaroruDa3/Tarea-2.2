const express = require("express");
const apiGhibli = express();
const { get, getId} = require('../controllers/apiGhibliController.js');

apiGhibli.get('', get);
apiGhibli.get('/:id', getId);
module.exports = apiGhibli;