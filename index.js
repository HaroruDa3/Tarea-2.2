const express = require('express');
const app = express();

app.use(express.json());

const apiGhibli = require('./routes/apiGhibli');
app.use('/api/ghibli', apiGhibli);
app.listen(3000);