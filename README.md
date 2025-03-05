# Easy Generator Auth Backend

This is the backend application for Easy Generator Auth, built with NestJS. It provides authentication and authorization functionalities using JWT tokens.

## Features

- User registration and login
- Email verification
- JWT-based authentication
- Swagger API documentation

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/easy-generator-auth-be.git
    cd easy-generator-auth-be
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following variables (RSA256) 2048 bit:
    ```env
    JWT_PRIVATE_SECRET=yourPrivateKey
    JWT_PUBLIC_SECRET=yourPublicKey
    JWT_EXPIRATION=3600s
    
    # Email Configuration
    EMAIL_USER=your_email_user_here
    EMAIL_PASSWORD_USER=your_email_password_here

    # Application Domain TO REDIRECT USER
    APP_DOMAIN=your_app_domain_here

      # Database Configuration
      DATABASE_URL=your_database_url_here
      DATABASE_USER=your_database_user_here
      DATABASE_PASSWORD=your_database_password_here
      SWAGGER_PATH=/api-docs
      CORS_ORIGIN=http://localhost:3000
      SERVER_PORT=3000
    ```

4. Run the application:
    ```bash
    npm run start
    ```

## API Documentation

The API documentation is available at the following endpoint:
- http://API_URL/api-docs

## Usage

### User Registration

- **Endpoint**: `POST /auth/signup`
- **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "username": "user123",
      "password": "password123!"
    }
    ```

### User Login

- **Endpoint**: `POST /auth/signin`
- **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "password123!"
    }
    ```

### Verify Email

- **Endpoint**: `GET /auth/verify-email`
- **Query Parameter**: `token`

### Access Home Page

- **Endpoint**: `GET /home`
- **Cookie**: `Cookie: jwt=yourJwtToken`

