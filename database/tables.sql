
drop table guibli_movies;
CREATE TABLE guibli_movies
(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200),
    director VARCHAR(200),
    anio numeric
)

INSERT INTO guibli_movies(nombre, director, anio) VALUES
('El castillo en el cielo','Hayao Miyazaki',1986),
('La tumba de las luciérnagas','Isao Takahata',1988),
('Mi vecino Totoro','Hayao Miyazaki',1988),
('Kiki: Entregas a domicilio','Hayao Miyazaki',1989),
('Recuerdos del ayer','Isao Takahata',1991),
('Porco Rosso','Hayao Miyazaki',1992),
('Pompoko','Isao Takahata',1994),
('La princesa Mononoke','Hayao Miyazaki',1997);

SELECT * FROM GUIBLI_MOVIES