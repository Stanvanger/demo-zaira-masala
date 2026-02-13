<?php
/**
 * ZAIRA MASALA - API del Menú
 * Endpoint para obtener categorías y platos
 */

require_once 'config.php';

setJSONHeaders();

// Manejar OPTIONS para CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    $pdo = getConnection();
    
    // Obtener parámetros de filtro
    $filtro = isset($_GET['filtro']) ? $_GET['filtro'] : null;
    $categoria = isset($_GET['categoria']) ? $_GET['categoria'] : null;
    
    // Construir query base
    $sql = "
        SELECT 
            c.id as categoria_id,
            c.slug as categoria_slug,
            c.nombre as categoria_nombre,
            c.icono as categoria_icono,
            c.descripcion as categoria_descripcion,
            p.id as plato_id,
            p.nombre as plato_nombre,
            p.descripcion as plato_descripcion,
            p.precio,
            p.es_vegano,
            p.es_vegetariano,
            p.nivel_picante,
            p.sin_gluten,
            p.imagen,
            p.destacado
        FROM categorias c
        LEFT JOIN platos p ON c.id = p.categoria_id AND p.activo = TRUE
        WHERE c.activo = TRUE
    ";
    
    $params = [];
    
    // Aplicar filtros
    if ($filtro === 'vegano') {
        $sql .= " AND p.es_vegano = TRUE";
    } elseif ($filtro === 'vegetariano') {
        $sql .= " AND (p.es_vegetariano = TRUE OR p.es_vegano = TRUE)";
    } elseif ($filtro === 'picante') {
        $sql .= " AND p.nivel_picante > 0";
    } elseif ($filtro === 'sin-gluten') {
        $sql .= " AND p.sin_gluten = TRUE";
    }
    
    // Filtrar por categoría específica
    if ($categoria) {
        $sql .= " AND c.slug = :categoria";
        $params[':categoria'] = $categoria;
    }
    
    $sql .= " ORDER BY c.orden, p.nombre";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $results = $stmt->fetchAll();
    
    // Estructurar datos por categorías
    $menu = [];
    foreach ($results as $row) {
        $catId = $row['categoria_id'];
        
        if (!isset($menu[$catId])) {
            $menu[$catId] = [
                'id' => $row['categoria_slug'],
                'nombre' => $row['categoria_nombre'],
                'icono' => $row['categoria_icono'],
                'descripcion' => $row['categoria_descripcion'],
                'items' => []
            ];
        }
        
        // Solo añadir si el plato existe (puede ser NULL por LEFT JOIN)
        if ($row['plato_id']) {
            $menu[$catId]['items'][] = [
                'id' => $row['plato_id'],
                'name' => $row['plato_nombre'],
                'description' => $row['plato_descripcion'],
                'price' => floatval($row['precio']),
                'vegan' => (bool)$row['es_vegano'],
                'vegetarian' => (bool)$row['es_vegetariano'],
                'spicy' => intval($row['nivel_picante']),
                'glutenFree' => (bool)$row['sin_gluten'],
                'image' => $row['imagen'],
                'featured' => (bool)$row['destacado']
            ];
        }
    }
    
    // Convertir a array indexado
    $response = [
        'success' => true,
        'categories' => array_values($menu)
    ];
    
    echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error al obtener el menú: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
