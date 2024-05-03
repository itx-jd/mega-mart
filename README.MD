# Wholesaler Ecommerce Web App

Welcome to the Wholesaler Ecommerce Web App! This web application provides a platform for wholesalers to manage products, orders, and categories efficiently.

## Features

- **User Authentication**: Secure user authentication system using JWT tokens.
- **Product Management**: Easily add, update, and delete products with image upload functionality.
- **Order Management**: Manage orders placed by customers with ease.
- **Category Management**: Organize products into categories for better navigation.
- **File Upload**: Utilize file upload functionality for product images with Cloudinary integration.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/itx-jd/mega-mart
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:Create a .env file in the root directory and add the following variables:
   ```plaintext
   CLOUD_NAME=your_cloud_name
   CLOUD_API_KEY=your_cloud_api_key
   CLOUD_API_SECRET=your_cloud_api_secret
   MONGO_URL=your_mongodb_connection_string
   PORT=5000
   ```
4. Run the application:
   ```bash
   npm start
   ```

## Usage

Once the application is running, you can access it in your browser at `http://localhost:5000`.

- Register new users and log in securely.
- Navigate through the dashboard to manage products, orders, and categories.
- Upload product images easily with the file upload functionality.
- Place and manage orders efficiently.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **File Upload**: Cloudinary
- **Frontend**: (Optional, if applicable)

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the [MIT License](LICENSE).
