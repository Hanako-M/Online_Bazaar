## Online Bazaar
# 🛡️ Advanced Backend Authentication System

A secure and scalable backend system built with **Node.js**, **Express**, **MongoDB**, and **bcrypt**, featuring strong password validation using `zxcvbn`, JWT-based authentication, and role-based support for customers and vendors.

---

## 🚀 Features

- 🔐 User & Vendor Registration with Hashed Passwords
- 🧠 Password Strength Checking via [`zxcvbn`](https://github.com/dropbox/zxcvbn)
- 🔄 JWT-based Authentication with Cookie Support
- 📧 Email Uniqueness Check for Both Roles
- 🔑 Secure Login with Error Handling
- 🧵 MongoDB Role Separation: `customer` & `vendor` Collections



## 🛠️ Tech Stack

- **Node.js** & **Express.js**
- **MongoDB** with **Mongoose**
- **bcrypt** for Password Hashing
- **zxcvbn** for Password Strength Scoring
- **jsonwebtoken** for Auth Token Creation
- **cookie-parser** for Token Handling

---



Online_Bazaar/ ├── config/ ├── controllers/ ├── middlewares/ ├── modules/ ├── routers/ ├── server.js ├── package.json └── .env

---

## 📦 Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Hanako-M/Online_Bazaar.git
   cd Online_Bazaar
Install dependencies:

 ```bash
     npm install
     Set up environment variables:

Create a .env file in the root directory and add the following:

```env

     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
Start the server:
   npm start

## 🧩 API Endpoints

# 🔐 API Endpoints
# 📄 Customer Registration
# Endpoint: POST /api/auth/customer/signup

Body:

````json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "StrongPass123!",
  "address": "123 Main St"
}
🛍️ Vendor Registration
Endpoint: POST /api/auth/vendor/signup

Body:

```json

{
  "name": "vendor_name",
  "email": "vendor@example.com",
  "password": "StrongPass123!"
}
🔑 User Login
Endpoint: POST /api/auth/signin

Body:

```json

{
  "email": "user@example.com",
  "password": "StrongPass123!"
}
Response:

```json

{
  "success": true,
  "user": {
    "id": "user_id",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
🧠 Password Strength Validation
Utilizes zxcvbn to assess password strength. Passwords scoring below 3 (on a scale of 0 to 4) are rejected with the following response:

```json

{
  "message": "Password is too weak. Please use a stronger one."
}
# 🧪 Testing
Instructions for running tests (if available) can be added here.

# 📄 License
This project is licensed under the MIT License.

# 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

# 📬 Contact
For any inquiries or feedback, please reach out via GitHub Issues.


