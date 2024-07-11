const multer = require('multer');

// Set up memory storage
const storage = multer.memoryStorage();

// Initialize multer with the memory storage
const upload = multer({ storage: storage });

//Exporting
module.exports = upload;