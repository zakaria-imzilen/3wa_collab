const nodemailer = require("nodemailer");

exports.sendEmailVerif = (req, res, next) => {
	if (req.token && req.user) {
		// My Account > Sign-in & Security > App Passwords (Sign in again to confirm it's you)
		// Scroll down to Select App (in the Password & sign-in method box)
		// and choose Other (custom name) Give this app password a name, e.g. "nodemailer"
		// Choose Generate Copy the long generated password and paste it into your Node.js script instead of your actual Gmail password.
		let config = {
			service: "gmail", // your email domain
			auth: {
				user: "zakariyaimzilen@gmail.com", // your email address
				pass: "owql vkur odui akpn", // your password
			},
		};
		let transporter = nodemailer.createTransport(config);

		let message = {
			from: "zakariyaimzilen@gmail.com", // sender address
			to: req.user.email, // list of receivers
			subject: "Email validation", // Subject line
			html: `<b>Hello Man, this is ZAKARIA</b> \nLink to verify your account <a href="http://localhost:4001/email/validation?token=${req.token}">Click me</a>`, // html body
		};

		transporter
			.sendMail(message)
			.then((info) => {
				return res.status(201).json({
					msg: "Email sent",
					info: info.messageId,
					preview: nodemailer.getTestMessageUrl(info),
				});
			})
			.catch((err) => {
				return res.status(500).json({ msg: err });
			});
	} else {
		console.log("token", req.token);
		console.log("user", req.user);
		next({ status: 500, message: "No user/token passed" });
	}
};
