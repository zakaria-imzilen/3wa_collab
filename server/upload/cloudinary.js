const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});
// Your OWN Config

async function handleUpload(file) {
	const res = await cloudinary.uploader.upload(file, {
		resource_type: "auto",
	});
	// Fetchs the Cloudinary API
	// To upload the file
	// it returns an object containing data related to the file
	// in the cloud (like the URL, its name...)
	return res;
}

module.exports = { handleUpload };
