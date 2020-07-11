
CREATE DATABASE WEB;
USE WEB;

CREATE TABLE USUARIO(
                    ID_USUARIO int NOT NULL AUTO_INCREMENT,
                    NOMBRE VARCHAR(32),
                    APELLIDOS VARCHAR(32),
                    EMAIL VARCHAR(32),
                    PASS VARCHAR(32),
                    TIPO VARCHAR(32),
                    PRIMARY KEY (ID_USUARIO )
                   );

CREATE TABLE TABLA (ID_TABLA INT NOT NULL AUTO_INCREMENT,
                    ID_USUARIO int NOT NULL,
                    LUNES BOOLEAN,
                    MARTES BOOLEAN,
                    MIERCOLES BOOLEAN,
                    JUEVES BOOLEAN,
                    VIERNES BOOLEAN,
                    SABADO BOOLEAN,
                    DOMINGO BOOLEAN,
                    HORAS VARCHAR(255),
                    PUBLICO BOOLEAN,
                    NOMBRE_TABLA VARCHAR(32),
                    PRIMARY KEY (ID_TABLA),
FOREIGN KEY (ID_USUARIO) REFERENCES USUARIO (ID_USUARIO)
                   );

CREATE TABLE TAREA(
ID_TAREA int NOT NULL AUTO_INCREMENT,
    ID_TABLA int,
	POSICION INT,
	CONTENIDO varchar(64),
	COLOR varchar(64) DEFAULT 'Rojo',
    PRIMARY KEY (ID_TAREA),
    FOREIGN KEY (ID_TABLA) REFERENCES TABLA (ID_TABLA));


INSERT INTO `usuario` (`ID_USUARIO`, `NOMBRE`, `APELLIDOS`, `EMAIL`, `PASS`, `TIPO`) VALUES (NULL, 'prueba', 'prueba', 'prueba@mail.com', 'prueba', 'prueba');