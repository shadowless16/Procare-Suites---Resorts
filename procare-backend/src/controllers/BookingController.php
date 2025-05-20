<?php
require_once __DIR__ . '/../helpers/ResponseHelper.php';

class BookingController
{
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function createBooking($data)
    {
        // Basic validation (expand as needed)
        if (empty($data['guest_name']) || empty($data['guest_email']) || empty($data['check_in']) || empty($data['check_out']) || empty($data['room_type'])) {
            ResponseHelper::sendJson(['success' => false, 'message' => 'Missing required fields.'], 400);
            exit;
        }
        $query = "INSERT INTO bookings (guest_name, guest_email, check_in, check_out, room_type, guests, special_requests) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $params = [
            $data['guest_name'],
            $data['guest_email'],
            $data['check_in'],
            $data['check_out'],
            $data['room_type'],
            $data['guests'] ?? 1,
            $data['special_requests'] ?? ''
        ];
        try {
            $this->db->executeQuery($query, $params);
            // Send email notification to hotel admin and guest using SMTP (PHPMailer)
            // --- SMTP CONFIGURATION ---
            $mailHost = 'smtp.gmail.com'; // e.g., smtp.gmail.com
            $mailUsername = 'your_gmail@gmail.com'; // your Gmail address
            $mailPassword = 'your_app_password'; // your Gmail App Password
            $mailPort = 587;
            $mailFrom = 'your_gmail@gmail.com'; // sender email
            $mailFromName = 'Procare Suites & Resorts';
            $adminEmail = 'procaresuites@gmail.com'; // admin email

            require_once __DIR__ . '/../../vendor/autoload.php';
            $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
            try {
                $mail->isSMTP();
                $mail->Host = $mailHost;
                $mail->SMTPAuth = true;
                $mail->Username = $mailUsername;
                $mail->Password = $mailPassword;
                $mail->SMTPSecure = 'tls';
                $mail->Port = $mailPort;
                $mail->setFrom($mailFrom, $mailFromName);
                $mail->addAddress($adminEmail);
                $mail->Subject = 'New Booking Received - Procare Suites & Resorts';
                $mail->Body = "A new booking has been received.\n\n" .
                    "Name: {$data['guest_name']}\n" .
                    "Email: {$data['guest_email']}\n" .
                    "Check-in: {$data['check_in']}\n" .
                    "Check-out: {$data['check_out']}\n" .
                    "Room Type: {$data['room_type']}\n" .
                    "Guests: {$data['guests']}\n" .
                    "Special Requests: {$data['special_requests']}\n";
                $mail->send();
                // Send confirmation to guest
                $mail->clearAddresses();
                $mail->addAddress($data['guest_email']);
                $mail->Subject = 'Your Booking at Procare Suites & Resorts';
                $mail->Body = "Dear {$data['guest_name']},\n\nThank you for booking with Procare Suites & Resorts!\n\n" .
                    "We have received your booking and will contact you soon to confirm.\n\n" .
                    "Booking Details:\n" .
                    "Check-in: {$data['check_in']}\n" .
                    "Check-out: {$data['check_out']}\n" .
                    "Room Type: {$data['room_type']}\n" .
                    "Guests: {$data['guests']}\n" .
                    "Special Requests: {$data['special_requests']}\n\n" .
                    "If you have any questions, reply to this email.";
                $mail->send();
            } catch (\Exception $e) {
                // Don't fail booking if email fails, but log or notify
            }
            ResponseHelper::sendJson(['success' => true, 'message' => 'Booking successful! Confirmation email sent.']);
        } catch (Exception $e) {
            ResponseHelper::sendJson(['success' => false, 'message' => 'Booking failed: ' . $e->getMessage()], 500);
        }
    }

    public function getBooking($id)
    {
        $booking = new Booking();
        $result = $booking->find($id);

        if ($result) {
            return ResponseHelper::sendResponse(200, 'Booking retrieved successfully', $result);
        } else {
            return ResponseHelper::sendResponse(404, 'Booking not found');
        }
    }

    public function updateBooking($id, $data)
    {
        $booking = new Booking();
        $result = $booking->update($id, $data);

        if ($result) {
            return ResponseHelper::sendResponse(200, 'Booking updated successfully');
        } else {
            return ResponseHelper::sendResponse(500, 'Failed to update booking');
        }
    }
}