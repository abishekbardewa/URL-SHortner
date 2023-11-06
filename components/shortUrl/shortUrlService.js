import ShortUrl from './shortUrlModel.js';

// Function to create a new unique Short Url
const createShortUrl = async (originalUrl) => {
	try {
		// Check if Short Url is exists or not
		const existingShortUrl = await ShortUrl.findOne({ originalUrl });
		if (existingShortUrl) {
			return {
				success: false,
			};
		}
		const newShortUrl = await ShortUrl.create({ originalUrl });
		return {
			success: true,
			data: newShortUrl,
		};
	} catch (error) {
		throw error;
	}
};

// Function to retrieve a list of Short Urls
const getShortUrls = async () => {
	try {
		const res = await ShortUrl.find();
		return res;
	} catch (error) {
		throw error;
	}
};

// Function to retrieve a Short Url
const redirectShortUrl = async (id) => {
	try {
		const res = await ShortUrl.findOne({ shortUrl: id });
		return res;
	} catch (error) {
		throw error;
	}
};

// Function to update Short Url details by Id
const updateShortUrl = async (id, updatedData) => {
	try {
		const res = await ShortUrl.findByIdAndUpdate(id, updatedData);
		return res;
	} catch (error) {
		throw error;
	}
};

// Function to delete a Short Url by Id
const deleteShortUrl = async (id) => {
	try {
		const res = await ShortUrl.findByIdAndDelete(id);
		return res;
	} catch (error) {
		throw error;
	}
};

export { redirectShortUrl, createShortUrl, getShortUrls, updateShortUrl, deleteShortUrl };
