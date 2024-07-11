const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
// console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let isOwner = await ownerModel.find();
    if (isOwner) {
      res.status(502).send("Owner already exists");
    } else {
      let { name, email, password } = req.body;
      let owner = await ownerModel.create({
        name,
        email,
        password,
      });
      res.status(201).send(owner);
    }
  });
}

router.get("/admin", (req, res) => {
  let success = req.flash(
    "success",
    "You have successfully created the product ! "
  );
  res.render("createproducts",{success});
});

module.exports = router;
