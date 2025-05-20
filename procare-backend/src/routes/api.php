<?php
require_once __DIR__ . '/../controllers/BookingController.php';

// Only handle POST /api/bookings
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/api/bookings') {
    $data = json_decode(file_get_contents('php://input'), true);
    $controller = new BookingController();
    $controller->createBooking($data);
} else {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Endpoint not found.']);
}
?>