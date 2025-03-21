const jwt = require('jsonwebtoken');
const Users = require('../modules/customer.mod.js');

const checkUser = async (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - no token provided" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - invalid token" });
  
    req.userId = decoded.id;
    // Check if the user exists
    const user = await Users.findById(req.userId).select("password");
    console.log(user);
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }
  
    req.user = user; // Attach the user to the request
    next();
  };

//check current user
//const jwt = require("jsonwebtoken");
//const User = require("../models/User");

// const checkUser = async (req, res, next) => {
//     const token = req.cookies.jwt;
//     console.log(req.cookies.jwt,"ya hana this is the token");
//     if (!token) {
//         req.user = null;
//         res.locals.user = null;
//     }
//     try {
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await Users.findById(decodedToken.id);
//         if (!user) {
//             req.user = null;
//             res.locals.user = null;
//         }
//         req.user = user; // Attach user to request for controller use
//         res.locals.user = user; // Attach user to response locals (optional)
//     } catch (err) {
//         console.error("JWT Verification Error:", err.message);
//         req.user = null;
//         res.locals.user = null;
//     }
//     next();
// };

module.exports = {checkUser};
