const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require(`../models/user-model`);

router.get("/", (req, res) => {
  res.send("Hiu");
});

router.post("/register", async (req, res) => {
  try {
    let { email, password, name } = req.body;

    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(503).send("Already registered with this email !");
    }

    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return res.status(400).send(err.message);
      }

      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          return res.status(400).send(err.message);
        } else {
          try {
            let createdUser = await userModel.create({
              name,
              email,
              password: hash,
            });

            let token = jwt.sign({ email, id: createdUser._id }, "prachi");
            res.cookie('token',token);
            res.status(200).send("User Created Successfully !");
          } catch (createErr) {
            res.status(500).send(createErr.message);
          }
        }
      });
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
