const express = require("express");
const router = express.Router();
const ownerModel = require('../models/owner-model');
// console.log(process.env.NODE_ENV);

router.get("/", (req, res) => {
  res.send("Hiu");
});

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
      let isOwner =await ownerModel.find();
      if (isOwner) {
          res.status(502).send("Owner already exists");
        } else {
            let {name,email,password} = req.body;
            let owner = await ownerModel.create({
                name,
                email,
                password,
            });
            res.status(201).send(owner);
        }
  });
}

module.exports = router;
