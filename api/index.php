<?php
// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/src/database/Database.php';
require_once __DIR__ . '/src/controllers/BookingController.php';
require_once __DIR__ . '/src/routes/api.php';

// Simple router
$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Debug: log the actual request URI
error_log('Request URI: ' . $requestUri);

// Match any URI containing /api/bookings
if (strpos($requestUri, '/api/bookings') !== false && $requestMethod === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $controller = new BookingController();
    $controller->createBooking($data);
    exit(); // Ensure only one response
} else {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Endpoint not found.']);
    exit();
}