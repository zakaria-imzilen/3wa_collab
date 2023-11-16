const { Schema, model } = require("mongoose");

const postSchema = new Schema(
	{
		url: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model("Post", postSchema);
