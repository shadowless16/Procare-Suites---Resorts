# Booking backend for Procare Suites & Resorts
# This file integrates the email sending logic from hotel-email-test/app.py

from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS
import os
from dotenv import load_dotenv
import logging
import smtplib

load_dotenv()

app = Flask(__name__)
CORS(app)

app.secret_key = os.getenv('SECRET_KEY', 'a-very-strong-dev-secret-key-should-be-set-in-env')
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS', 'True').lower() in ('true', '1', 't', 'yes')
app.config['MAIL_USE_SSL'] = os.getenv('MAIL_USE_SSL', 'False').lower() in ('true', '1', 't', 'yes')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER', app.config['MAIL_USERNAME'])
app.config['HOTEL_EMAIL'] = os.getenv('HOTEL_EMAIL')
app.config['HOTEL_NAME'] = os.getenv('HOTEL_NAME', 'Procare Suites & Resorts')

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]')
app.logger.setLevel(logging.INFO)

mail = Mail(app)

@app.route('/api/booking', methods=['POST'])
def booking():
    data = request.json
    guest_name = data.get('guest_name', '').strip()
    guest_email = data.get('guest_email', '').strip()
    check_in = data.get('check_in')
    check_out = data.get('check_out')
    room_type = data.get('room_type')
    guests = data.get('guests')
    special_requests = data.get('special_requests', 'None').strip()

    required_fields = {
        'Full Name': guest_name,
        'Email': guest_email,
        'Check-in Date': check_in,
        'Check-out Date': check_out,
        'Room Type': room_type,
        'Number of Guests': guests
    }
    missing_fields = [name for name, value in required_fields.items() if not value]
    if missing_fields:
        return jsonify({'success': False, 'message': f"Please fill out all required fields: {', '.join(missing_fields)}."}), 400

    hotel_name = app.config['HOTEL_NAME']
    try:
        hotel_subject = f"New Booking Request: {guest_name} - {room_type} ({check_in} to {check_out})"
        hotel_msg = Message(
            subject=hotel_subject,
            recipients=[app.config['HOTEL_EMAIL']],
            sender=(hotel_name, app.config['MAIL_DEFAULT_SENDER'])
        )
        hotel_msg.body = f"""
New booking request submitted through the website.\n\nGuest: {guest_name}\nEmail: {guest_email}\nRoom Type: {room_type}\nCheck-in: {check_in}\nCheck-out: {check_out}\nGuests: {guests}\nSpecial Requests: {special_requests if special_requests else 'None provided.'}\n"""
        mail.send(hotel_msg)

        guest_subject = f"Booking Request Received - {hotel_name}"
        guest_msg = Message(
            subject=guest_subject,
            recipients=[guest_email],
            sender=(hotel_name, app.config['MAIL_DEFAULT_SENDER'])
        )
        guest_msg.body = f"""
Dear {guest_name},\n\nThank you for submitting your booking request for {hotel_name}!\n\nWe have received your request and will contact you soon to confirm availability.\n\nDetails:\nRoom Type: {room_type}\nCheck-in: {check_in}\nCheck-out: {check_out}\nGuests: {guests}\nSpecial Requests: {special_requests if special_requests else 'None provided.'}\n"""
        mail.send(guest_msg)
        return jsonify({'success': True, 'message': 'Booking request submitted successfully! Please check your email for details.'})
    except Exception as e:
        app.logger.error(f"Error sending booking email: {e}", exc_info=True)
        return jsonify({'success': False, 'message': 'An error occurred while sending your booking request. Please try again later.'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
