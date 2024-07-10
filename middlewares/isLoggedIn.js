const flash = require("connect-flash");
const expressSession = require("express-session");
const userModel = require(`../models/user-model`);
const jwt = require("jsonwebtoken");

module.exports.isLoggedIn = async (req, res) => {
  if (!req.session.user) {
    req.flash("error", "You are not logged in !");
    return res.redirect("/");
  }
  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
  }
};
