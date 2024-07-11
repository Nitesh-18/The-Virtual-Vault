const express = require("express");
const upload = require("../controllers/multer-config");
const productModel = require("../models/product-model");
const router = express.Router();
const flash = require('connect-flash');

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    let { name, price, discount, textColor, panelColor, bgColor } = req.body;
    let product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgColor,
      panelColor,
      textColor,
    });
   req.flash("success","You have successfully created the product ! ");
   res.redirect("/owners/admin");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
