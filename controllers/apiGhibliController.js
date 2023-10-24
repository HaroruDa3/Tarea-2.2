const db = require ('../database/conn');

const get = async (req, res)=>{
    let sql = 'select * from guibli_movies';
    const result = await db.query(sql);
    res.json(result); 
}

const getId = async (req, res)=>{
    let params = [
        req.params.id
    ];
    let sql = 'select * from guibli_movies where id = $1';
    const result = await db.query(sql, params);
    res.json(result); 
}
module.exports = {
    get, 
    getId
}
