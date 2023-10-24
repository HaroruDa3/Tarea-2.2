const db = require('../database/conn');

// Obtener todas las películas
const getPeliculas = async (req, res) => {
  try {
    const sql = `
      SELECT 
        Peliculas.PeliculaID,
        Peliculas.Título,
        Directores.Nombre AS Director,
        Peliculas.AñoPublicacion,
        Peliculas.Descripcion,
        ARRAY_AGG(Categorias.Nombre) AS Categorias
      FROM Peliculas
      INNER JOIN Directores ON Peliculas.DirectorID = Directores.DirectorID
      LEFT JOIN PeliculasCategorias ON Peliculas.PeliculaID = PeliculasCategorias.PeliculaID
      LEFT JOIN Categorias ON PeliculasCategorias.CategoriaID = Categorias.CategoriaID
      GROUP BY Peliculas.PeliculaID, Directores.Nombre;
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las películas.' });
  }
};


// Obtener una película por su ID
const getPeliculaById = async (req, res) => {
  try {
    const peliculaID = req.params.id;
    const sql = `
      SELECT 
        Peliculas.PeliculaID,
        Peliculas.Título,
        Directores.Nombre AS Director,
        Peliculas.AñoPublicacion,
        Peliculas.Descripcion,
        ARRAY_AGG(Categorias.Nombre) AS Categorias
      FROM Peliculas
      INNER JOIN Directores ON Peliculas.DirectorID = Directores.DirectorID
      LEFT JOIN PeliculasCategorias ON Peliculas.PeliculaID = PeliculasCategorias.PeliculaID
      LEFT JOIN Categorias ON PeliculasCategorias.CategoriaID = Categorias.CategoriaID
      WHERE Peliculas.PeliculaID = $1
      GROUP BY Peliculas.PeliculaID, Directores.Nombre;
    `;
    const result = await db.query(sql, [peliculaID]);
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Película no encontrada.' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la película.' });
  }
};

// Crear una nueva película
const createPelicula = async (req, res) => {
  try {
    const { titulo, directorID, añoPublicacion, descripcion } = req.body;
    const sql = 'INSERT INTO Peliculas (Título, DirectorID, AñoPublicacion, Descripcion) VALUES ($1, $2, $3, $4) RETURNING *';
    const result = await db.query(sql, [titulo, directorID, añoPublicacion, descripcion]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear una nueva película.' });
  }
};

// Actualizar una película por su ID
const updatePelicula = async (req, res) => {
  try {
    const peliculaID = req.params.id;
    const { titulo, directorID, añoPublicacion, descripcion } = req.body;
    const sql = 'UPDATE Peliculas SET Título = $1, DirectorID = $2, AñoPublicacion = $3, Descripcion = $4 WHERE PeliculaID = $5 RETURNING *';
    const result = await db.query(sql, [titulo, directorID, añoPublicacion, descripcion, peliculaID]);
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Película no encontrada.' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la película.' });
  }
};

// Eliminar una película por su ID
const deletePelicula = async (req, res) => {
  try {
    const peliculaID = req.params.id;
    const sql = 'DELETE FROM Peliculas WHERE PeliculaID = $1 RETURNING *';
    const result = await db.query(sql, [peliculaID]);
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Película no encontrada.' });
    } else {
      res.json({ message: 'Película eliminada con éxito.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la película.' });
  }
};

const asociarPeliculaACategoria = async (req, res) => {
  try {
    const { peliculaID, categoriaID } = req.body;
    const sql = 'INSERT INTO PeliculasCategorias (PeliculaID, CategoriaID) VALUES ($1, $2) RETURNING *';
    const result = await db.query(sql, [peliculaID, categoriaID]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al asociar la película a la categoría.' });
  }
};

module.exports = {
  getPeliculas,
  getPeliculaById,
  createPelicula,
  updatePelicula,
  deletePelicula,
  asociarPeliculaACategoria
};
