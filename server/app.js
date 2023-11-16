// Comment 1- Init app.js
// Comment 2- Hicham

// Comment 3- Zakaria
// Comment 4- New Commit

const express = require("express");
const nodemailer = require("nodemailer");

const upload = require("./upload/storing");
const { handleUpload } = require("./upload/cloudinary");
const Post = require("./models/Post");
const dbConn = require("./config/db");

require("dotenv").config();

const app = express();

dbConn
	.then((resp) => {
		console.log("DB Connected");
	})
	.catch((err) => {
		console.log("DB - not connected", err);
	});

app.post("/upload", upload.single("file"), async (req, res, next) => {
	// Exploit the file data (lah ykhlaf 3la multer memory storage)
	// It's uploaded it 🤫 in RAM
	// Now we can point to that file and play with its data
	try {
		const b64 = Buffer.from(req.file.buffer).toString("base64");
		let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
		const cldRes = await handleUpload(dataURI);

		const fileURL = cldRes.url;

		Post.create({ url: fileURL })
			.then((resp) => {
				console.log(resp);

				res.json(resp);
			})
			.catch((err) => {
				console.log("Post creating: ", err);
				res.status(500).send(err);
			});
	} catch (error) {
		console.log(error);
		res.send({
			message: error.message,
		});
	}
});

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
