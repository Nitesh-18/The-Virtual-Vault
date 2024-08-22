const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
// console.log(typeof isLoggedIn);

router.get("/", (req, res) => {
  let error = req.flash("error");
  let success = req.flash("success");
  res.render("index", { error, success, loggedin: false });
});

router.get("/addtocart/:productid", isLoggedIn, async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/shop");
    }

    if (!user.cart) {
      user.cart = [];
    }

    let product = await productModel.findById(req.params.productid);
    if (!product) {
      req.flash("error", "Product not found");
      return res.redirect("/shop");
    }

    if (!product.image) {
      product.image = "default_image_data"; // Replace with a default image if none exists
    }

    user.cart.push(product._id);
    await user.save();

    req.flash("success", "Product Added to Cart");
    res.redirect("/shop");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get("/shop", isLoggedIn, (req, res) => {
  let success = req.flash("success");
  productModel
    .find()
    .then((products) => {
      res.render("shop", { products, success });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).render("error");
    });
});

router.get("/cart", isLoggedIn, async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email }).populate('cart');

    if (!user || !user.cart) {
      return res.status(404).send("Cart not found");
    }

    console.log(user.cart);

    // Calculating the total bill of all items
    let totalAmount = 0;
    user.cart.forEach((item) => {
      totalAmount += Number(item.price) - Number(item.discount);
    });

    res.render("cart", { user, totalAmount });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get("/logout", isLoggedIn, (req, res) => {
  res.render("shop");
});

module.exports = router;
