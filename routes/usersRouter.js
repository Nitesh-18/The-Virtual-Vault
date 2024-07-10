const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require(`../models/user-model`);

const {generateToken}  = require('../utils/generateTokens');
const {registerUser,loginUser,logoutUser} = require('../controllers/authController');

router.get("/", (req, res) => {
  res.send("Hiu");
});

router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/logout",logoutUser);

module.exports = router;
