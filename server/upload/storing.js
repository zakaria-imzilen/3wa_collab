const multer = require("multer");

const storage = new multer.memoryStorage();

module.exports = multer({ storage });
