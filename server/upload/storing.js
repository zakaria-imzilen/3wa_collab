const multer = require("multer");

const storage = new multer.memoryStorage();
// Memory Storage: tells the interpreter to store the file (temporarly) in the RAM as Buffer

module.exports = multer({ storage });
