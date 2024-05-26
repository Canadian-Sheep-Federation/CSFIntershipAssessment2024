const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const attachUser = async (req, res, next) => {
  try {
    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next();
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next();
    }

    req.user = currentUser;
    next();
  } catch (err) {
    return next();
  }
};

module.exports = attachUser;
