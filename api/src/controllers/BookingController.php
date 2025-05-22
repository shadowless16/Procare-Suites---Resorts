<?php
require_once __DIR__ . '/../helpers/ResponseHelper.php';
require_once __DIR__ . '/../database/Database.php';
require_once __DIR__ . '/../models/Booking.php';

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
            // --- SMTP CONFIGURATION for cPanel ---
            $mailHost = 'localhost'; // or 'mail.procaresuites.com.ng' if localhost doesn't work
            $mailUsername = 'info@procaresuites.com.ng'; // your new cPanel email
            $mailPassword = 'info@procaresuites.com.ng'; // the password you set for this email
            $mailFrom = 'info@procaresuites.com.ng';
            $mailFromName = 'Procare Suites & Resorts';
            $adminEmail = 'info@procaresuites.com.ng'; // or any admin email you want to receive notifications

            require_once __DIR__ . '/../../vendor/autoload.php';
            $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
            try {
                // Enable detailed SMTP debug output
                $mail->SMTPDebug = 3; // Most verbose
                $mail->Debugoutput = function($str, $level) {
                    file_put_contents(__DIR__ . '/../../mail_debug.log', $str . PHP_EOL, FILE_APPEND);
                };
                $mail->isSMTP();
                $mail->Host = $mailHost;
                $mail->SMTPAuth = true;
                $mail->Username = $mailUsername;
                $mail->Password = $mailPassword;
                $mail->SMTPSecure = '';
                $mail->Port = 25; // or 587 if 25 doesn't work
                $mail->SMTPOptions = [
                    'ssl' => [
                        'verify_peer' => false,
                        'verify_peer_name' => false,
                        'allow_self_signed' => true
                    ]
                ];
                $mail->setFrom($mailFrom, $mailFromName);
                $mail->addAddress($adminEmail);
                $mail->addAddress('akdavid4real@gmail.com'); // Add this line after $mail->addAddress($adminEmail);
                // $mail->addAddress('yourgmail@gmail.com'); // Add your Gmail here for forwarding
                $mail->isHTML(true);
                $logoUrl = 'https://i.ibb.co/mr4qydtP/logo-removebg-preview.png'; // Updated logo URL
                $adminBody = '<table style="width:100%;max-width:600px;border:1px solid #e2e8f0;font-family:sans-serif;background:#f8fafc;border-radius:8px;overflow:hidden;">'
                    . '<tr><td style="background:#2563eb;padding:24px 0;text-align:center;"><img src="' . $logoUrl . '" alt="Procare Suites & Resorts" style="max-width:160px;"></td></tr>'
                    . '<tr><td style="padding:32px 24px 24px 24px;">'
                    . '<h2 style="color:#2563eb;font-size:1.5rem;margin-bottom:0.5rem;">New Booking Received</h2>'
                    . '<p style="font-size:1.1rem;color:#334155;margin-bottom:1.5rem;">A new booking has been made on your website. Here are the details:</p>'
                    . '<table style="width:100%;margin:18px 0 24px 0;font-size:1rem;color:#1e293b;background:#fff;border-radius:6px;overflow:hidden;border:1px solid #e2e8f0;">'
                    . '<tr><td style="padding:8px 12px;"><b>Name:</b></td><td style="padding:8px 12px;">' . htmlspecialchars($data['guest_name']) . '</td></tr>'
                    . '<tr style="background:#f1f5f9;"><td style="padding:8px 12px;"><b>Email:</b></td><td style="padding:8px 12px;">' . htmlspecialchars($data['guest_email']) . '</td></tr>'
                    . '<tr><td style="padding:8px 12px;"><b>Check-in:</b></td><td style="padding:8px 12px;">' . htmlspecialchars($data['check_in']) . '</td></tr>'
                    . '<tr style="background:#f1f5f9;"><td style="padding:8px 12px;"><b>Check-out:</b></td><td style="padding:8px 12px;">' . htmlspecialchars($data['check_out']) . '</td></tr>'
                    . '<tr><td style="padding:8px 12px;"><b>Room Type:</b></td><td style="padding:8px 12px;">' . htmlspecialchars($data['room_type']) . '</td></tr>'
                    . '<tr style="background:#f1f5f9;"><td style="padding:8px 12px;"><b>Guests:</b></td><td style="padding:8px 12px;">' . htmlspecialchars($data['guests']) . '</td></tr>'
                    . '<tr><td style="padding:8px 12px;"><b>Special Requests:</b></td><td style="padding:8px 12px;">' . htmlspecialchars($data['special_requests']) . '</td></tr>'
                    . '</table>'
                    . '<div style="margin-top:2rem;text-align:center;">'
                    . '<a href="https://procaresuites.com.ng" style="display:inline-block;padding:0.75rem 2rem;background:#2563eb;color:#fff;border-radius:6px;text-decoration:none;font-weight:600;font-size:1rem;">Visit Our Website</a>'
                    . '</div>'
                    . '<p style="color:#64748b;font-size:0.95rem;margin-top:2.5rem;text-align:center;">Warm regards,<br>Procare Suites & Resorts Team<br><span style="color:#94a3b8;font-size:0.9rem;">&copy; 2025 Procare Suites & Resorts</span></p>'
                    . '</td></tr></table>';
                $mail->Subject = 'New Booking Received - Procare Suites & Resorts';
                $mail->Body = $adminBody;
                $mail->AltBody = "A new booking has been received.\n\nName: {$data['guest_name']}\nEmail: {$data['guest_email']}\nCheck-in: {$data['check_in']}\nCheck-out: {$data['check_out']}\nRoom Type: {$data['room_type']}\nGuests: {$data['guests']}\nSpecial Requests: {$data['special_requests']}\n";
                $mail->send();
                // Send confirmation to guest
                $mail->clearAddresses();
                $mail->addAddress($data['guest_email']);
                $guestLogoUrl = 'https://i.ibb.co/mr4qydtP/logo-removebg-preview.png'; // Updated logo URL
                $guestBody = '<table style="width:100%;max-width:600px;border:1px solid #e2e8f0;font-family:sans-serif;background:#f8fafc;border-radius:8px;overflow:hidden;">'
                    . '<tr><td style="background:#2563eb;padding:24px 0;text-align:center;"><img src="' . $guestLogoUrl . '" alt="Procare Suites & Resorts" style="max-width:160px;"></td></tr>'
                    . '<tr><td style="padding:32px 24px 24px 24px;">'
                    . '<h2 style="color:#2563eb;font-size:1.5rem;margin-bottom:0.5rem;">Thank You for Your Booking!</h2>'
                    . '<p style="font-size:1.1rem;color:#334155;margin-bottom:1.5rem;">Dear ' . htmlspecialchars($data['guest_name']) . ',</p>'
                    . '<p style="font-size:1rem;color:#475569;margin-bottom:1.5rem;">We are delighted to confirm your reservation at <b style="color:#2563eb;">Procare Suites & Resorts</b>. Here are your booking details:</p>'
                    . '<table style="width:100%;margin:18px 0 24px 0;font-size:1rem;color:#1e293b;background:#fff;border-radius:6px;overflow:hidden;border:1px solid #e2e8f0;">'
                    . '<tr><td style="padding:8px 12px;"><b>Check-in:</b></td><td style="padding:8px 12px;">' . htmlspecialchars($data['check_in']) . '</td></tr>'
                    . '<tr style="background:#f1f5f9;"><td style="padding:8px 12px;"><b>Check-out:</b></td><td style="padding:8px 12px;">' . htmlspecialchars($data['check_out']) . '</td></tr>'
                    . '<tr><td style="padding:8px 12px;"><b>Room Type:</b></td><td style="padding:8px 12px;">' . htmlspecialchars($data['room_type']) . '</td></tr>'
                    . '<tr style="background:#f1f5f9;"><td style="padding:8px 12px;"><b>Guests:</b></td><td style="padding:8px 12px;">' . htmlspecialchars($data['guests']) . '</td></tr>'
                    . '<tr><td style="padding:8px 12px;"><b>Special Requests:</b></td><td style="padding:8px 12px;">' . htmlspecialchars($data['special_requests']) . '</td></tr>'
                    . '</table>'
                    . '<p style="font-size:1rem;color:#475569;margin-bottom:1.5rem;">If you have any questions or need to make changes, simply reply to this email or contact our front desk. <br>We look forward to welcoming you and making your stay exceptional!</p>'
                    . '<div style="margin-top:2rem;text-align:center;">'
                    . '<a href="https://procaresuites.com.ng" style="display:inline-block;padding:0.75rem 2rem;background:#2563eb;color:#fff;border-radius:6px;text-decoration:none;font-weight:600;font-size:1rem;">Visit Our Website</a>'
                    . '</div>'
                    . '<p style="color:#64748b;font-size:0.95rem;margin-top:2.5rem;text-align:center;">Warm regards,<br>Procare Suites & Resorts Team<br><span style="color:#94a3b8;font-size:0.9rem;">&copy; 2025 Procare Suites & Resorts</span></p>'
                    . '</td></tr></table>';
                $mail->Subject = 'Your Booking at Procare Suites & Resorts';
                $mail->Body = $guestBody;
                $mail->AltBody = "Dear {$data['guest_name']},\nThank you for booking with Procare Suites & Resorts!\nCheck-in: {$data['check_in']}\nCheck-out: {$data['check_out']}\nRoom Type: {$data['room_type']}\nGuests: {$data['guests']}\nSpecial Requests: {$data['special_requests']}\n";
                $mail->send();
            } catch (\Exception $e) {
                ResponseHelper::sendJson([
                    'success' => false,
                    'message' => 'Booking saved, but email failed: ' . $e->getMessage()
                ], 500);
                return;
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