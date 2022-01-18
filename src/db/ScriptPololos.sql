CREATE DATABASE pololos;
USE pololos;
CREATE TABLE persona(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nombre VARCHAR(100) NULL DEFAULT NULL,
    cedula VARCHAR(10) NOT NULL UNIQUE,
    telefono VARCHAR(12) NULL DEFAULT NULL,
    direccion VARCHAR(50) NULL DEFAULT NULL
);
CREATE TABLE cargo
(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(50) NOT NULL UNIQUE
);
CREATE TABLE empleado
(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    persona_id INT NOT NULL,
    cargo_id INT NOT NULL,
    sueldo FLOAT NOT NULL,
    comision FLOAT NOT NULL DEFAULT 0,
    usuario_id INT NOT NULL
);
ALTER TABLE empleado ADD FOREIGN KEY(persona_id) REFERENCES persona(id);
ALTER TABLE empleado ADD FOREIGN KEY(cargo_id) REFERENCES cargo(id);
CREATE TABLE usuario
(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    contrasenia VARCHAR(18) NOT NULL
);
ALTER TABLE empleado ADD FOREIGN KEY(usuario_id) REFERENCES usuario(id);
CREATE TABLE cliente
(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    persona_id INT NULL DEFAULT NULL,
    usuario_id INT NULL DEFAULT NULL
);
ALTER TABLE cliente ADD FOREIGN KEY(persona_id) REFERENCES persona(id);
ALTER TABLE cliente ADD FOREIGN KEY(usuario_id) REFERENCES usuario(id);
CREATE TABLE categoria
(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(20) NOT NULL UNIQUE
);
CREATE TABLE producto
(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    foto VARCHAR(225) NULL DEFAULT NULL,
    precio_unitario DECIMAL(12,2) NOT NULL,
    cantidad INT NOT NULL DEFAULT 0,
    categoria_id INT NOT NULL
);
ALTER TABLE producto ADD FOREIGN KEY(categoria_id) REFERENCES categoria(id);
CREATE TABLE venta
(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    cantidad INT NOT NULL,
    precio DECIMAL(12,2) NOT NULL,
    producto_id INT NOT NULL,
    factura_venta_id INT NOT NULL
);
ALTER TABLE venta ADD FOREIGN KEY(producto_id) REFERENCES producto(id);
ALTER TABLE venta ADD FOREIGN KEY(factura_venta_id) REFERENCES factura_venta(id);
CREATE TABLE factura_venta
(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    cliente_id INT NOT NULL,
    precio_a_pagar DECIMAL(12,2) NOT NULL,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    iva DECIMAL(12,2) NOT NULL
);
ALTER TABLE factura_venta ADD FOREIGN KEY(cliente_id) REFERENCES cliente(id);
CREATE TABLE articulo
(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    precio_unitario DECIMAL(12,2) NOT NULL,
    cantidad INT NOT NULL
);
CREATE TABLE proveedor
(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    persona_id INT NOT NULL
);
ALTER TABLE proveedor ADD FOREIGN KEY(persona_id) REFERENCES persona(id);
CREATE TABLE compra
(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    articulo_id INT NOT NULL,
    factura_id INT NOT NULL,
    precio DECIMAL(12,2) NOT NULL,
    cantidad INT NOT NULL
);
ALTER TABLE compra ADD FOREIGN KEY(articulo_id) REFERENCES articulo(id);
CREATE TABLE factura_compra
(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    proveedor_id INT NOT NULL,
    precio_a_pagar DECIMAL(12,2) NOT NULL,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE compra ADD FOREIGN KEY(factura_id) REFERENCES factura_compra(id);
ALTER TABLE factura_compra ADD FOREIGN KEY(proveedor_id) REFERENCES proveedor(id);
CREATE TABLE pedido
(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    mesa INT NULL DEFAULT NULL,
    persona_id INT NULL DEFAULT NULL,
    estado INT NOT NULL DEFAULT 0,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    nota VARBINARY(255) NULL DEFAULT NULL
);
ALTER TABLE pedido ADD FOREIGN KEY (persona_id) REFERENCES persona(id);
CREATE TABLE producto_x_pedido
(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    pedido_id INT NOT NULL REFERENCES pedido(id),
    producto_id INT NOT NULL REFERENCES producto(id),
    cantidad INT NOT NULL
);
ALTER TABLE producto_x_pedido ADD FOREIGN KEY(pedido_id) REFERENCES pedido(id);
ALTER TABLE producto_x_pedido ADD FOREIGN KEY(producto_id) REFERENCES producto(id);
ALTER TABLE producto_x_pedido ADD FOREIGN KEY(pedido_id) REFERENCES pedido(id);
ALTER TABLE producto_x_pedido ADD FOREIGN KEY(producto_id) REFERENCES producto(id);
INSERT INTO categoria(nombre) VALUES('Hamburguesa'),('Salchipapas'),('Tostones'),('Postres'),('Bebidas'),('Adicion');
INSERT INTO cargo(nombre) VALUES('Mesero'),('Cajero'),('Cocinero'),('Administrador');
