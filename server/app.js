// Comment 1- Init app.js
// Comment 2- Hicham

// Comment 3- Zakaria
// Comment 4- New Commit

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const EmailToken = require("./models/EmailToken");
const { sign } = require("jsonwebtoken");
const { newAccount } = require("./fake");
const { sendEmailVerif } = require("./middlewares/email");
const User = require("./models/User");

const dbconn = require("./config/db");

const app = express();

app.use(bodyParser.json());

dbconn()
	.then((resp) => {
		console.log("DB Connected", resp.models);
	})
	.catch((err) => {
		console.log("DB -- Failed to connect", err);
	});

app.post(
	"/signup",
	(req, res, next) => {
		// Sign up is DONE
		req.user = newAccount;

		// 1- Generate a token
		const token = crypto.randomUUID();
		req.token = token;

		// 2- Store it in DB + his new user_id
		EmailToken.create({ token, user_id: req.user._id })
			.then((resp) => {
				if (resp) {
					// Send him the email validation
					next();
				} else {
					next({ status: 500, message: "Couldn't send the email validation" });
				}
			})
			.catch((err) => {});
	},
	sendEmailVerif
);

app.get("/email/validation", (req, res, next) => {
	const { token } = req.query;

	if (!token) {
		next({ status: 422, message: "No token passed down the URL" });
		return;
	}

	// Verify token
	EmailToken.findOne({ token })
		.then((resp) => {
			if (!resp) {
				next({ status: 422, message: "Expired token" });
				return;
			}

			// Turn his "emailValidationStatus" field to TRUE
			User.updateOne({ _id: resp.user_id }, { emailValidationStatus: true })
				.then((updateResp) => {
					if (!updateResp.acknowledged) {
						return next({
							status: 500,
							message: "Couldn't activate his account!",
						});
					}

					// Remove the doc
					EmailToken.deleteMany({ user_id: resp.user_id.toString() })
						.then((deleteResp) => {
							console.log("user id", resp.user_id.toString());
							console.log("delete response", deleteResp);

							if (deleteResp.deletedCount != 1) {
								return next({
									status: 500,
									message: "Couldn't expire his token!",
								});
							} else {
								// Good to go
								res
									.status(200)
									.send({ message: "User account activated successfuly" });
							}
						})
						.catch((err) => {
							console.log(err);
							return next({
								status: 500,
								message: err.message ?? "Couldn't expire his token!",
							});
						});
				})
				.catch((err) => {
					return next({
						status: 500,
						message: err.messsage ?? "Couldn't activate his account!",
					});
				});
		})
		.catch((err) => {
			next({
				status: 500,
				message: err.message ?? "Couldn't process finding the token",
			});
			return;
		});
	return;
});

app.use((req, res, next) => {
	next({ status: 404, message: "Route not found" });
});

app.use((err, req, res, next) => {
	res
		.status(err.status ?? 500)
		.send({ message: err.message ?? "Something went wrong" });
});

app.listen(4001, () => console.log("Server listening on 4001"));
