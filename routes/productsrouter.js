const express = require('express');
const upload = require('../controllers/multer-config');
const productModel = require('../models/product-model');
const router = express.Router();

router.post("/create",upload.single('image'),async (req,res) => {
    let {name,price,discount,textColor,panelColor,bgColor} = req.body;
    let product = productModel.create({
        image: req.file.buffer,
        name ,
        price,
        discount,
        bgColor,
        panelColor,
        textColor,
    })
})

module.exports = router;
