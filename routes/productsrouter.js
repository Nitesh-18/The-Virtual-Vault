const express = require('express');
const upload = require('../controllers/multer-config');
const router = express.Router();

router.post("/create",upload.single('image'), (req,res) => {
    res.send(req.file);
})

module.exports = router;
