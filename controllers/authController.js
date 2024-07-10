const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require(`../models/user-model`);

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
