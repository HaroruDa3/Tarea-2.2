const db = require('../database/conn');

// Obtener todas las categorías
const getCategorias = async (req, res) => {
  try {
    const sql = 'SELECT * FROM Categorias';
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las categorías.' });
  }
};

// Obtener una categoría por su ID
const getCategoriaById = async (req, res) => {
  try {
    const categoriaID = req.params.id;
    const sql = 'SELECT * FROM Categorias WHERE CategoriaID = $1';
    const result = await db.query(sql, [categoriaID]);
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Categoría no encontrada.' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la categoría.' });
  }
};

// Crear una nueva categoría
const createCategoria = async (req, res) => {
  try {
    const { nombre } = req.body;
    const sql = 'INSERT INTO Categorias (Nombre) VALUES ($1) RETURNING *';
    const result = await db.query(sql, [nombre]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear una nueva categoría.' });
  }
};

// Actualizar una categoría por su ID
const updateCategoria = async (req, res) => {
  try {
    const categoriaID = req.params.id;
    const { nombre } = req.body;
    const sql = 'UPDATE Categorias SET Nombre = $1 WHERE CategoriaID = $2 RETURNING *';
    const result = await db.query(sql, [nombre, categoriaID]);
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Categoría no encontrada.' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la categoría.' });
  }
};

// Eliminar una categoría por su ID
const deleteCategoria = async (req, res) => {
  try {
    const categoriaID = req.params.id;
    const sql = 'DELETE FROM Categorias WHERE CategoriaID = $1 RETURNING *';
    const result = await db.query(sql, [categoriaID]);
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Categoría no encontrada.' });
    } else {
      res.json({ message: 'Categoría eliminada con éxito.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la categoría.' });
  }
};

module.exports = {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};
