# Procare Suites & Resorts Backend

This is the backend for the Procare Suites & Resorts website, built using PHP. The backend handles booking management and data processing for the hotel.

## Project Structure

```
procare-backend
├── public
│   └── index.php               # Entry point for the application
├── src
│   ├── controllers
│   │   └── BookingController.php # Handles booking-related requests
│   ├── models
│   │   └── Booking.php          # Represents the booking data model
│   ├── database
│   │   └── Database.php         # Manages database connections
│   ├── routes
│   │   └── api.php              # API route definitions
│   └── helpers
│       └── ResponseHelper.php    # Utility methods for JSON responses
├── config
│   └── config.php               # Configuration settings
├── composer.json                 # Composer dependencies and autoloading
└── README.md                     # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd procare-backend
   ```

3. Install dependencies using Composer:
   ```
   composer install
   ```

4. Configure your database settings in `config/config.php`.

## Usage

- The application can be accessed via the `public/index.php` file.
- API routes are defined in `src/routes/api.php` and are handled by the `BookingController`.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.