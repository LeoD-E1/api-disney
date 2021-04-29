CREATE TABLE IF NOT EXISTS users(
    id_user INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    email VARCHAR (100) UNIQUE NOT NULL CHECK(email <> ''),
    password VARCHAR (100) NOT NULL,
    dataCreation TIMESTAMP default CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS characters (
    id_character INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    img TEXT NOT NULL CHECK (img <> ''),
    name VARCHAR (60) NOT NULL CHECK (name <> ''),
    age INTEGER NOT NULL CHECK (age > 0),
    weight FLOAT NOT NULL CHECK (weight > 3),
    history TEXT NOT NULL CHECK(history <> ''),
    dataCreation TIMESTAMP default CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS series (
    id_serie INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    img TEXT NOT NULL CHECK (img <> ''),
    title VARCHAR (200) NOT NULL CHECK (title <> ''),
    rating INTEGER NOT NULL CHECK (
        rating > 0
        and rating < 6
    ),
    gender VARCHAR (70) NOT NULL CHECK(gender <> ''),
    releaseDate DATE NOT NULL CHECK (releaseDate > '1937-01-01'),
    dataCreation TIMESTAMP default CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS movies (
    id_movie INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    img TEXT NOT NULL CHECK (img <> ''),
    title VARCHAR (200) NOT NULL CHECK (title <> ''),
    rating INTEGER NOT NULL CHECK (
        rating > 0
        and rating < 6
    ),
    releaseDate DATE NOT NULL CHECK (releaseDate > '1900-01-01'),
    gender VARCHAR (70) NOT NULL CHECK(gender <> ''),
    dataCreation TIMESTAMP default CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS series_characters(
    id_serie INTEGER REFERENCES series(id_serie) ON DELETE CASCADE ON UPDATE CASCADE,
    id_character INTEGER REFERENCES characters(id_character) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (id_serie, id_character),
    dataCreation TIMESTAMP default CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS movies_characters(
    id_movie INTEGER REFERENCES movies(id_movie) ON DELETE CASCADE ON UPDATE CASCADE,
    id_character INTEGER REFERENCES characters(id_character) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (id_movie, id_character),
    dataCreation TIMESTAMP default CURRENT_TIMESTAMP
);