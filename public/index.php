<?php
// Archivo index.php para compatibilidad con Hostinger
$request_uri = $_SERVER['REQUEST_URI'];

// Limpiar la URI
$uri_path = parse_url($request_uri, PHP_URL_PATH);
if (substr($uri_path, 0, 1) !== '/') {
    $uri_path = '/' . $uri_path;
}

// Eliminar la barra final si existe (excepto para la raíz)
if ($uri_path !== '/' && substr($uri_path, -1) === '/') {
    $uri_path = rtrim($uri_path, '/');
}

// Determinar qué archivo HTML servir
$html_file = __DIR__ . $uri_path;

// Si la ruta termina con / o no tiene extensión, buscar index.html
if (substr($uri_path, -1) === '/' || !pathinfo($uri_path, PATHINFO_EXTENSION)) {
    if (substr($html_file, -1) === '/') {
        $html_file .= 'index.html';
    } else {
        $html_file .= '/index.html';
    }
}

// Si no termina en .html, añadirlo
if (!preg_match('/\.html$/', $html_file)) {
    $html_file .= '.html';
}

// Verificar si el archivo existe
if (file_exists($html_file)) {
    echo file_get_contents($html_file);
} else {
    // Si no existe el archivo, servir la página 404 o el index.html
    $notFoundFile = __DIR__ . '/404.html';
    if (file_exists($notFoundFile)) {
        header("HTTP/1.0 404 Not Found");
        echo file_get_contents($notFoundFile);
    } else {
        // Si no hay página 404, redirigir al index
        echo file_get_contents(__DIR__ . '/index.html');
    }
}
?>