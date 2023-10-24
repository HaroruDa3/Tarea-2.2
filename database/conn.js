const pgp = require('pg-promise')();

const user = 'postgres';
const pass = 'DLS4530J714';
const host = 'localhost'
const database = 'postgres';
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