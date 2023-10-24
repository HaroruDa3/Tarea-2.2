
-- Tabla de Directores
CREATE TABLE Directores (
    DirectorID SERIAL PRIMARY KEY, -- Clave primaria
    Nombre VARCHAR(255),
    Nacionalidad VARCHAR(100),
    FechaNacimiento DATE
    -- Otra información relevante sobre el director
);

-- Tabla de Películas
CREATE TABLE Peliculas (
    PeliculaID SERIAL PRIMARY KEY, -- Clave primaria
    Título VARCHAR(255),
    DirectorID INT REFERENCES Directores(DirectorID), -- Clave foránea
    AñoPublicacion INT,
    Descripcion TEXT
);

-- Tabla de Categorías
CREATE TABLE Categorias (
    CategoriaID SERIAL PRIMARY KEY, -- Clave primaria
    Nombre VARCHAR(100)
);

-- Tabla intermedia para la relación muchos a muchos entre Películas y Categorías
CREATE TABLE PeliculasCategorias (
    PeliculaID INT REFERENCES Peliculas(PeliculaID), -- Clave foránea a Películas
    CategoriaID INT REFERENCES Categorias(CategoriaID) -- Clave foránea a Categorías
);


--Poblar la base 
INSERT INTO Directores (Nombre, Nacionalidad, FechaNacimiento)
VALUES
  ('Hayao Miyazaki', 'Japón', '1941-01-05'),
  ('Isao Takahata', 'Japón', '1935-10-29');

INSERT INTO Categorias (Nombre)
VALUES
  ('Animación'),
  ('Fantasía'),
  ('Drama'),
  ('Aventura');

-- Películas de Studio Ghibli
INSERT INTO Peliculas (Título, DirectorID, AñoPublicacion, Descripcion)
VALUES
  ('El viaje de Chihiro', 1, 2001, 'Chihiro y sus padres se adentran en un mundo de dioses y espíritus.'),
  ('Mi vecino Totoro', 1, 1988, 'Dos hermanas se encuentran con criaturas mágicas en el campo.'),
  ('El castillo ambulante', 1, 2004, 'Sophie se encuentra con un castillo mágico y su dueño Howl.'),
  ('La princesa Mononoke', 1, 1997, 'Ashitaka se encuentra en medio de una guerra entre humanos y dioses del bosque.'),
  ('El viento se levanta', 1, 2013, 'La vida del ingeniero Jiro Horikoshi, diseñador del avión Zero.'),
  ('La tumba de las luciérnagas', 2, 1988, 'La historia de dos hermanos tratando de sobrevivir en Japón durante la Segunda Guerra Mundial.'),
  ('El recuerdo de Marnie', 2, 2014, 'Anna conoce a una misteriosa niña llamada Marnie.'),
  ('El cuento de la princesa Kaguya', 1, 2013, 'La historia de una niña que crece rápidamente en el campo.'),
  ('Nausicaä del Valle del Viento', 1, 1984, 'Nausicaä lucha por salvar su mundo de la contaminación y los insectos gigantes.'),
  ('Susurros del corazón', 1, 1995, 'Una joven encuentra un gato que cambia su vida.');

-- Relaciones de categoría para las películas de Studio Ghibli
INSERT INTO PeliculasCategorias (PeliculaID, CategoriaID)
VALUES
  (1, 1), -- "El viaje de Chihiro" en "Animación"
  (1, 2), -- "El viaje de Chihiro" en "Fantasía"
  (2, 1), -- "Mi vecino Totoro" en "Animación"
  (2, 2), -- "Mi vecino Totoro" en "Fantasía"
  (3, 1), -- "El castillo ambulante" en "Animación"
  (3, 2), -- "El castillo ambulante" en "Fantasía"
  (4, 1), -- "La princesa Mononoke" en "Animación"
  (4, 2), -- "La princesa Mononoke" en "Fantasía"
  (4, 3), -- "La princesa Mononoke" en "Drama"
  (5, 1), -- "El viento se levanta" en "Animación"
  (5, 3), -- "El viento se levanta" en "Drama"
  (6, 3), -- "La tumba de las luciérnagas" en "Drama"
  (7, 3), -- "El recuerdo de Marnie" en "Drama"
  (8, 3), -- "El cuento de la princesa Kaguya" en "Drama"
  (9, 1), -- "Nausicaä del Valle del Viento" en "Animación"
  (9, 2), -- "Nausicaä del Valle del Viento" en "Fantasía"
  (10, 1); -- "Susurros del corazón" en "Animación"
