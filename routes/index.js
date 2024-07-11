const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
// console.log(typeof isLoggedIn);

router.get("/", (req, res) => {
  let error = req.flash("error");
  let success = req.flash("success");
  res.render("index", { error ,success});
});

router.get("/shop", isLoggedIn, (req, res) => {
  productModel
    .find()
    .then((products) => {
      res.render("shop", { products });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).render("error");
    });
});

router.get("/logout", isLoggedIn, (req, res) => {
  res.render("shop");
});

module.exports = router;
