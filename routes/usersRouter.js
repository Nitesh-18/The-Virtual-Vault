const express = require("express");
const router = express.Router();

const userModel = require(`../models/user-model`);
// console.log("USER MODEL HERE:",userModel);

router.get("/", (req, res) => {
  res.send("Hiu");
});

router.post("/register", async (req, res) => {
  try {
    let { email, password, name } = req.body;
    let user = await userModel.findOne({ email });
    if (user) res.status(503).send("Already registered with this email !");
    let createdUser = await userModel.create({
      name,
      email,
      password,
    });
    res.status(200).send(createdUser);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
