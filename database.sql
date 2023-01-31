DROP DATABASE IF EXISTS proyads;

CREATE DATABASE proyads;

USE proyads;

-- Tabla de usuarios
CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(70) NOT NULL,
    password VARCHAR(60) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (username)
);

-- Tabla de ejercicios
CREATE TABLE equations(
    id INT AUTO_INCREMENT NOT NULL,
	a FLOAT NOT NULL,
	b FLOAT NOT NULL,
	c FLOAT NOT NULL,
	created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	userId INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Insertar usuarios predefinidos
INSERT INTO users(username, password) VALUES ('admin', '1234');

-- Insertar ejercicios predefinidos
INSERT INTO equations(a, b, c, userId) VALUES 
(1, 2, 1, 1),
(1, 4, 6, 1),
(1, 5, 6, 1);
