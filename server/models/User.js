const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	pwd: {
		type: String,
		required: true,
	},
	emailValidationStatus: {
		type: Boolean,
		default: false,
	},
});

module.exports = model("User", userSchema);
