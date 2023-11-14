// Comment 1- Init app.js
// Comment 2- Hicham

// Comment 3- Zakaria
// Comment 4- New Commit

const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

app.post("/email", (req, res) => {
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
		to: "hicham13sayidi@gmail.com", // list of receivers
		subject: "Mail sending test", // Subject line
		html: "<b>Hello Hicham, this is ZAKARIA</b>", // html body
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
});

app.listen(4001, () => console.log("Server listening on 4001"));
