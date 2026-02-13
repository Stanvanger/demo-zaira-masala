-- ========================================
-- ZAIRA MASALA - Base de Datos del Menú
-- Script de creación e inserción de datos
-- ========================================

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS zaira_masala 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE zaira_masala;

-- ===== TABLA CATEGORÍAS =====
CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(50) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    icono VARCHAR(10) NOT NULL,
    descripcion TEXT,
    orden INT DEFAULT 0,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== TABLA PLATOS =====
CREATE TABLE IF NOT EXISTS platos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria_id INT NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(6,2) NOT NULL,
    es_vegano BOOLEAN DEFAULT FALSE,
    es_vegetariano BOOLEAN DEFAULT FALSE,
    nivel_picante TINYINT DEFAULT 0, -- 0=no, 1=picante, 2=muy picante, 3=extra picante
    sin_gluten BOOLEAN DEFAULT FALSE,
    imagen VARCHAR(255),
    destacado BOOLEAN DEFAULT FALSE,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE CASCADE
);

-- ===== INSERTAR CATEGORÍAS =====
INSERT INTO categorias (slug, nombre, icono, descripcion, orden) VALUES
('entrantes-veg', 'Entrantes Vegetarianos', '🥗', 'Crujientes, aromáticos y llenos de sabor', 1),
('entrantes-tandoor', 'Entrantes Tandoor', '🔥', 'Marinados en especias indias y asados al horno', 2),
('pollo', 'Platos de Pollo', '🍗', 'Currys indios con diferentes salsas', 3),
('vegetarianos', 'Platos Vegetarianos', '🥦', 'Sabor auténtico sin carne', 4),
('cordero', 'Especialidades de Cordero', '🐑', 'El sabor más intenso de la India', 5),
('mar', 'Platos del Mar', '🦐', 'Frescura del océano con especias indias', 6),
('pan', 'Pan Tandoori', '🫓', 'Recién horneado en nuestro tandoor', 7),
('acompañamientos', 'Acompañamientos', '🍚', 'Arroces y guarniciones', 8),
('postres', 'Postres Indios', '🍨', 'Dulces tradicionales', 9),
('bebidas', 'Bebidas', '🥤', 'Para refrescarte', 10);

-- ===== INSERTAR PLATOS: ENTRANTES VEGETARIANOS =====
INSERT INTO platos (categoria_id, nombre, descripcion, precio, es_vegano, es_vegetariano, nivel_picante) VALUES
(1, 'Pakora', 'Verduras variadas rebozadas en harina de garbanzo y fritas.', 4.95, TRUE, TRUE, 0),
(1, 'Samosas de Verduras (x2)', 'Empanadillas rellenas de patata, guisantes, cilantro y especias.', 4.95, FALSE, TRUE, 0),
(1, 'Veg Mix Platter', 'Surtido de aperitivos vegetarianos fritos. Ideal para compartir.', 13.95, FALSE, TRUE, 0),
(1, 'Onion Bhaji', 'Cebolla rebozada en harina de garbanzo, crujiente y especiada.', 4.95, TRUE, TRUE, 0),
(1, 'Aloo Tikki', 'Mini hamburguesas de patata rellenas de queso y especias.', 5.50, FALSE, TRUE, 0);

-- ===== INSERTAR PLATOS: ENTRANTES TANDOOR =====
INSERT INTO platos (categoria_id, nombre, descripcion, precio, nivel_picante) VALUES
(2, 'Chicken Tikka', 'Pechuga de pollo marinada con yogur, jengibre y limón.', 10.90, 1),
(2, 'Lamb Tikka', 'Trozos de cordero marinados con yogur, lima y hierbas aromáticas.', 12.95, 1),
(2, 'Chicken Tandoori', 'Pollo macerado con yogur, jengibre y ajo, asado al tandoor.', 10.50, 0),
(2, 'King Prawn Tandoori', 'Langostinos al horno tandoor con especias tradicionales.', 14.95, 0),
(2, 'Mantra Special Mix Grill', 'Pollo Tandoori, Chicken Tikka, Lamb Tikka y King Prawn Tandoori.', 19.95, 1);

-- ===== INSERTAR PLATOS: POLLO =====
INSERT INTO platos (categoria_id, nombre, descripcion, precio, nivel_picante, destacado) VALUES
(3, 'Chicken Tikka Masala', 'Pollo tikka en salsa de tomate, nata y especias aromáticas.', 12.95, 0, TRUE),
(3, 'Butter Chicken', 'Pollo cocinado en salsa cremosa de mantequilla y especias.', 12.95, 0, TRUE),
(3, 'Chicken Korma', 'Curry suave con frutos secos, leche y nata.', 12.80, 0, FALSE),
(3, 'Mango Chicken', 'Pollo con mango en salsa de azafrán y crema.', 12.50, 1, FALSE),
(3, 'Mantra Special Chicken Curry', 'Pollo con especias indias y mantequilla clarificada (ghee).', 12.50, 0, FALSE),
(3, 'Kadai Chicken', 'Pollo con cebolla, tomate y semillas de cilantro.', 14.95, 0, FALSE),
(3, 'Chicken Jalfrezi', 'Pollo con cebolla, tomate y pimientos verdes y rojos.', 13.50, 1, FALSE),
(3, 'Chicken Madrasi', 'Pollo con salsa picante de tomate y especias.', 13.50, 2, FALSE),
(3, 'Chicken Vindaloo', 'Pollo con salsa muy picante.', 13.95, 3, FALSE);

-- ===== INSERTAR PLATOS: VEGETARIANOS =====
INSERT INTO platos (categoria_id, nombre, descripcion, precio, es_vegano, es_vegetariano, nivel_picante) VALUES
(4, 'Baingan Bhaji', 'Berenjena al horno con cebolla y especias.', 10.50, TRUE, TRUE, 0),
(4, 'Chana Masala', 'Garbanzos con cebolla, tomate y especias.', 10.95, TRUE, TRUE, 1),
(4, 'Dal Tadka', 'Lentejas con tomate y cebolla.', 10.95, FALSE, TRUE, 0),
(4, 'Veg Korma', 'Verduras en salsa de frutos secos y leche de coco.', 10.50, TRUE, TRUE, 0),
(4, 'Mix Vegetable', 'Curry de verduras con salsa de cebolla, tomate y especias.', 10.95, TRUE, TRUE, 0),
(4, 'Palak Paneer', 'Queso fresco indio en salsa de espinacas.', 10.95, FALSE, TRUE, 0),
(4, 'Kadai Paneer', 'Queso fresco con cebolla, tomate y semillas de cilantro.', 10.95, FALSE, TRUE, 0);

-- ===== INSERTAR PLATOS: CORDERO =====
INSERT INTO platos (categoria_id, nombre, descripcion, precio, nivel_picante) VALUES
(5, 'Lamb Korma', 'Cordero en salsa de frutos secos y leche de coco.', 13.50, 0),
(5, 'Lamb Roganjosh', 'Cordero con cebolla, tomate, jengibre, ajo y especias.', 13.50, 1),
(5, 'Lamb Tikka Masala', 'Cordero tikka en salsa de tomate y nata.', 13.50, 0),
(5, 'Lamb Madrasi', 'Cordero con salsa picante de tomate y especias.', 13.50, 2),
(5, 'Lamb Kadai', 'Cordero con cebolla, tomate y cilantro.', 13.95, 0),
(5, 'Lamb Vindaloo', 'Cordero con salsa muy picante.', 13.95, 3),
(5, 'Lamb Jalfrezi', 'Cordero con cebolla, tomate y pimientos.', 13.95, 1),
(5, 'Lamb Palak', 'Cordero en salsa de espinacas.', 13.95, 0),
(5, 'Mantra Special Lamb Curry', 'Nuestra receta especial de cordero con especias selectas.', 14.95, 0);

-- ===== INSERTAR PLATOS: MAR =====
INSERT INTO platos (categoria_id, nombre, descripcion, precio, nivel_picante) VALUES
(6, 'Prawn Masala', 'Gambas en salsa de especias.', 11.95, 0),
(6, 'Prawn Madrasi', 'Gambas con salsa picante de tomate y especias.', 12.95, 2),
(6, 'Prawn Korma', 'Gambas con salsa de frutos secos y leche de coco.', 12.95, 0),
(6, 'Prawn Vindaloo', 'Gambas con salsa muy picante.', 12.95, 3),
(6, 'Prawn Jalfrezi', 'Gambas con cebolla, tomate y pimientos.', 12.95, 1);

-- ===== INSERTAR PLATOS: PAN =====
INSERT INTO platos (categoria_id, nombre, descripcion, precio, es_vegetariano) VALUES
(7, 'Plain Naan', 'Pan tradicional indio.', 3.25, TRUE),
(7, 'Onion Naan', 'Naan con cebolla.', 3.45, TRUE),
(7, 'Garlic Naan', 'Naan con ajo.', 3.90, TRUE),
(7, 'Butter Naan', 'Naan con mantequilla.', 4.45, TRUE),
(7, 'Cheese Naan', 'Naan relleno de queso.', 4.95, TRUE),
(7, 'Peshawari Naan', 'Pan dulce con frutos secos y coco.', 5.50, TRUE);

-- ===== INSERTAR PLATOS: ACOMPAÑAMIENTOS =====
INSERT INTO platos (categoria_id, nombre, descripcion, precio, es_vegetariano) VALUES
(8, 'Pulao Rice', 'Arroz basmati aromático.', 3.95, TRUE),
(8, 'Jeera Rice', 'Arroz con comino.', 3.95, TRUE),
(8, 'Lemon Rice', 'Arroz con limón.', 4.95, TRUE),
(8, 'Matar Pulao', 'Arroz con guisantes.', 5.95, TRUE),
(8, 'Kashmiri Pulao', 'Arroz con frutos secos de Cachemira.', 6.95, TRUE),
(8, 'Vegetable Biryani', 'Arroz especiado con verduras.', 10.50, TRUE),
(8, 'Chicken Biryani', 'Arroz especiado con pollo.', 10.50, FALSE),
(8, 'Mutton Biryani', 'Arroz especiado con cordero.', 11.50, FALSE),
(8, 'Prawn Biryani', 'Arroz especiado con gambas.', 12.95, FALSE);

-- ===== INSERTAR PLATOS: POSTRES =====
INSERT INTO platos (categoria_id, nombre, descripcion, precio, es_vegetariano) VALUES
(9, 'Kulfi Pistacho', 'Helado tradicional indio de pistacho.', 4.90, TRUE),
(9, 'Kulfi Mango', 'Helado tradicional indio de mango.', 4.50, TRUE);

-- ===== INSERTAR PLATOS: BEBIDAS =====
INSERT INTO platos (categoria_id, nombre, descripcion, precio) VALUES
(10, 'Agua Natural (0,5 L)', 'Agua mineral.', 2.50),
(10, 'Agua con Gas', 'Agua mineral con gas.', 2.50),
(10, 'Coca-Cola', 'Refresco clásico.', 2.95),
(10, 'Coca-Cola Zero', 'Sin azúcar.', 2.95),
(10, 'Fanta', 'Refresco de naranja.', 2.95),
(10, 'Cerveza India Kingfisher', 'Cerveza premium de la India. +18', 3.50),
(10, 'Cerveza India Cobra', 'Cerveza suave de la India. +18', 3.50),
(10, 'Cerveza Sin Alcohol', 'Para todos.', 2.95);

-- ===== ÍNDICES PARA OPTIMIZACIÓN =====
CREATE INDEX idx_platos_categoria ON platos(categoria_id);
CREATE INDEX idx_platos_vegano ON platos(es_vegano);
CREATE INDEX idx_platos_vegetariano ON platos(es_vegetariano);
CREATE INDEX idx_platos_picante ON platos(nivel_picante);
CREATE INDEX idx_platos_destacado ON platos(destacado);

-- ===== VISTA PARA MENÚ COMPLETO =====
CREATE OR REPLACE VIEW v_menu_completo AS
SELECT 
    p.id,
    p.nombre,
    p.descripcion,
    p.precio,
    p.es_vegano,
    p.es_vegetariano,
    p.nivel_picante,
    p.sin_gluten,
    p.imagen,
    p.destacado,
    c.id as categoria_id,
    c.nombre as categoria_nombre,
    c.icono as categoria_icono,
    c.descripcion as categoria_descripcion
FROM platos p
JOIN categorias c ON p.categoria_id = c.id
WHERE p.activo = TRUE AND c.activo = TRUE
ORDER BY c.orden, p.nombre;
