const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require(`../models/user-model`);

const {generateToken}  = require('../utils/generateTokens');
const {registerUser} = require('../controllers/authController');

router.get("/", (req, res) => {
  res.send("Hiu");
});

router.post("/register",registerUser);

module.exports = router;
