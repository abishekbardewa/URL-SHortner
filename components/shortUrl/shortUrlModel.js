import mongoose from 'mongoose';
import shortId from 'shortid';
const shortUrlSchema = new mongoose.Schema({
	originalUrl: {
		type: String,
		required: true,
	},
	shortUrl: {
		type: String,
		required: true,
		default: shortId.generate,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});
const shortUrl = mongoose.model('shortUrl', shortUrlSchema);

export default shortUrl;
