const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
require("dotenv").config();

async function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    const error = new Error("access denied, no token provided");
    error.status = 401;
    return next(error);
  }

  console.log("TOKEN:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 récupérer user complet depuis la DB
    const user = await User.findById(decoded._id);

    if (!user) {
      const error = new Error("user not found");
      error.status = 404;
      return next(error);
    }

    // ✔️ user complet (avec companyId, role, etc.)
    req.user = user;

    console.log("USER FULL:", req.user);

    next();

  } catch (err) {
    const error = new Error("invalid or expired token");
    error.status = 403;
    next(error);
  }
}

module.exports = verifyToken;