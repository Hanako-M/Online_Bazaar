const jwt = require('jsonwebtoken');

const checkUser = (req, res, next) => {
    console.log("Cookies received:", req.cookies); // ✅ Debugging

    const token = req.cookies?.token; // ✅ Safe access (avoid crash)

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized - No Token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        req.user = { userid: decoded.id }; // ✅ Ensure `userid` is set properly// ✅ Now `req.user` is set correctly
        next();
    } catch (err) {
        return res.status(403).json({ success: false, message: "Invalid Token" });
    }
};

module.exports = checkUser;
