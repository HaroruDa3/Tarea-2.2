const pgp = require('pg-promise')();
require('dotenv').config();

const user = process.env.DB_USER;
const pass = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const database = process.env.DB_DATABASE;
const conectionString = `postgresql://${user}:${pass}@${host}:5432/${database}`;
const db = pgp(conectionString);

db.connect()
    .then( ()=>{

        console.log("Conexion Exitosa");

    })
    .catch( (err)=>{

        console.log(`Error de Conexión ${err}`);

    })

module.exports = db;