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

## 🧩 API Endpoints

### ✅ Sign Up (Customer)
