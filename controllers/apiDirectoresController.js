const db = require('../database/conn');

const getDirectores = async (req, res) => {
  try {
    const sql = 'SELECT * FROM Directores';
    const result = await db.query(sql);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los directores.' });
  }
};

const getDirectorById = async (req, res) => {
  try {
    const directorID = req.params.id;
    const sql = 'SELECT * FROM Directores WHERE DirectorID = $1';
    const result = await db.query(sql, [directorID]);
    
    if (result.length === 0) {
      res.status(404).json({ error: 'Director no encontrado.' });
    } else {
      res.json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el director.' });
  }
};

const createDirector = async (req, res) => {
  try {
    const { nombre, nacionalidad, fechaNacimiento } = req.body;
    const sql = 'INSERT INTO Directores (Nombre, Nacionalidad, FechaNacimiento) VALUES ($1, $2, $3) RETURNING *';
    const result = await db.query(sql, [nombre, nacionalidad, fechaNacimiento]);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear un nuevo director.' });
  }
};

const updateDirector = async (req, res) => {
  try {
    const directorID = req.params.id;
    const { nombre, nacionalidad, fechaNacimiento } = req.body;
    const sql = 'UPDATE Directores SET Nombre = $1, Nacionalidad = $2, FechaNacimiento = $3 WHERE DirectorID = $4 RETURNING *';
    const result = await db.query(sql, [nombre, nacionalidad, fechaNacimiento, directorID]);
    
    if (result.length === 0) {
      res.status(404).json({ error: 'Director no encontrado.' });
    } else {
      res.json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el director.' });
  }
};

const deleteDirector = async (req, res) => {
  try {
    const directorID = req.params.id;

    // Verificar si existen películas asociadas a este director
    const checkMoviesSQL = 'SELECT * FROM Peliculas WHERE DirectorID = $1';
    const moviesResult = await db.query(checkMoviesSQL, [directorID]);

    if (moviesResult.length > 0) {
      res.status(400).json({ error: 'No se puede eliminar el director porque tiene películas asociadas.' });
      return;
    }

    // Si no hay películas asociadas, eliminar el director
    const deleteDirectorSQL = 'DELETE FROM Directores WHERE DirectorID = $1 RETURNING *';
    const result = await db.query(deleteDirectorSQL, [directorID]);

    if (result.length === 0) {
      res.status(404).json({ error: 'Director no encontrado.' });
    } else {
      res.json({ message: 'Director eliminado con éxito.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el director.' });
  }
};


module.exports = {
  getDirectores,
  getDirectorById,
  createDirector,
  updateDirector,
  deleteDirector
};
