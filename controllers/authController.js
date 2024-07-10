const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require(`../models/user-model`);
const flash = require("connect-flash");
const { generateToken } = require("../utils/generateTokens");

module.exports.registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .send({ message: "Email, password, and name are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .send({ message: "Already registered with this email" });
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res.status(400).send({ message: err.message });
      }

      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.status(400).send({ message: err.message });
        }

        try {
          const createdUser = await userModel.create({
            name,
            email,
            password: hash,
          });

          const token = generateToken(createdUser);
          res.cookie("token", token);
          res.status(201).send({ message: "User created successfully" });
        } catch (createErr) {
          res.status(500).send({ message: createErr.message });
        }
      });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      req.flash("error", "Email and password are required");
      return res.redirect("/");
    }

    let existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      req.flash("error", "User not found");
      return res.redirect("/");
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      req.flash("error", "Invalid password");
      return res.redirect("/");
    }

    let token = generateToken(existingUser);
    res.cookie("token", token);
    req.flash("success", "User logged in successfully");
    res.redirect("/shop");
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/");
  }
};

module.exports.logoutUser = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};
