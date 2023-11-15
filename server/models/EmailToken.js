const { Schema, Types, model } = require("mongoose");

const emailTokenSchema = new Schema(
	{
		user_id: {
			type: Types.ObjectId,
			required: true,
		},
		token: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = model("EmailToken", emailTokenSchema);
