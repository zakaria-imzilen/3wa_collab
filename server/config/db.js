const { connect } = require("mongoose");

module.exports = connect("mongodb://127.0.0.1:27017", { dbName: "3WA_Blog" });
