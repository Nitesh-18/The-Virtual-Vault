const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel  = require("../models/user-model");
// console.log(typeof isLoggedIn);

router.get("/", (req, res) => {
  let error = req.flash("error");
  let success = req.flash("success");
  res.render("index", { error ,success, loggedin: false});
});

router.get("/addtocart/:productid",isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({email: req.user.email});
  user.cart.push(req.params.productid);
  await user.save();
  req.flash("success", "Product Added to Cart");
  res.redirect("/shop");
});

router.get("/shop", isLoggedIn, (req, res) => {
  let success = req.flash("success");
  productModel
    .find()
    .then((products) => {
      res.render("shop", { products , success});
    })
    .catch((err) => {
      console.error(err);
      res.status(500).render("error");
    });
});
router.get("/cart", isLoggedIn, (req, res) => {
  res.render("cart");
});

router.get("/logout", isLoggedIn, (req, res) => {
  res.render("shop");
});

module.exports = router;
