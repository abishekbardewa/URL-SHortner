import messages from '../../config/messages.js';
import { shortUrlJoiSchema } from '../../validations/shortUrlJoi.js';
import { createShortUrl, redirectShortUrl, getShortUrls, updateShortUrl, deleteShortUrl } from './shortUrlService.js';

// Controller for creating a new Short Url
const createShortUrlApi = async (req, res) => {
	try {
		// Validates the request body using Joi schema
		const { error, value } = shortUrlJoiSchema.validate(req.body);
		if (error) {
			// Validation error response
			res.status(400).json({
				status: 400, // Bad Request
				success: false,
				data: { error: error.details[0].message },
			});
		} else {
			// Create the Short Url and send a success response
			const result = await createShortUrl(value.originalUrl);

			if (result.success) {
				res.status(201).json({
					status: 201, // Created
					success: true,
					data: result.data,
				});
			} else {
				res.status(409).json({
					status: 409,
					success: false,
					data: { error: messages.ALREADY_EXISTS },
				});
			}
		}
	} catch (error) {
		// Internal server error response
		res.status(500).json({
			status: 500,
			success: false,
			data: { error: messages.SERVER_ERROR },
		});
	}
};

// Controller for redirecting to a  specific Short Url

const redirectShortUrlApi = async (req, res) => {
	try {
		const shortUrlId = req.params.shortUrlId;
		const result = await redirectShortUrl(shortUrlId);
		if (result) {
			// Redirect to a originalUrl
			res.redirect(result.originalUrl);
		} else {
			// Not found response
			res.status(404).json({
				status: 404, // Not Found
				success: false,
				data: { error: messages.NOT_FOUND },
			});
		}
	} catch (error) {
		// Internal server error response
		res.status(500).json({
			status: 500,
			success: false,
			data: { error: messages.SERVER_ERROR },
		});
	}
};

// Controller for getting a list of Short Urls
const getShortUrlsApi = async (req, res) => {
	try {
		// Retrieve and send a list of Short Urls
		const shortUrls = await getShortUrls();
		res.status(200).json({
			status: 200, //OK
			success: true,
			data: shortUrls,
		});
	} catch (error) {
		// Internal server error response
		res.status(500).json({
			status: 500,
			success: false,
			data: { error: messages.SERVER_ERROR },
		});
	}
};

// Controller for updating Short Url details by ID

const updateShortUrlApi = async (req, res) => {
	try {
		const id = req.params.id;
		if (!id) {
			// Invalid request response
			res.status(400).json({
				status: 400, // Bad Request
				success: false,
				data: { error: messages.ID_NOT_FOUND },
			});
			return;
		}
		// Validates the request body using Joi schema
		const { error, value } = shortUrlJoiSchema.validate(req.body);
		if (error) {
			// Validation error response
			res.status(400).json({
				status: 400, // Bad Request
				success: false,
				data: { error: error.details[0].message },
			});
		} else {
			const updatedRes = await updateShortUrl(id, value);

			if (updatedRes) {
				// Short Url updated response
				res.status(200).json({
					status: 200, //OK
					success: true,
					data: { message: messages.SUCCESS },
				});
			} else {
				// Short Url not found response
				res.status(404).json({
					status: 404, //Not Found
					success: false,
					data: { error: messages.NOT_FOUND },
				});
			}
		}
	} catch (error) {
		// Internal server error response
		res.status(500).json({
			status: 500,
			success: false,
			data: { error: messages.SERVER_ERROR },
		});
	}
};
// Controller for deleting a Short Url by ID
const deleteShortUrlApi = async (req, res) => {
	try {
		const id = req.params.id;
		if (!id) {
			// Invalid request response
			res.status(400).json({
				status: 400, // Bad Request
				success: false,
				data: { error: messages.ID_NOT_FOUND },
			});
			return;
		}
		const result = await deleteShortUrl(id);
		if (result) {
			// Short Url deleted response
			res.status(200).json({
				status: 200, //OK
				success: true,
				data: { message: messages.SUCCESS },
			});
		} else {
			// Short Url not found response
			res.status(404).json({
				status: 404, //Not Found
				success: false,
				data: { error: messages.NOT_FOUND },
			});
		}
	} catch (error) {
		// Internal server error response
		res.status(500).json({
			status: 500,
			success: false,
			data: { error: messages.SERVER_ERROR },
		});
	}
};

export { createShortUrlApi, getShortUrlsApi, redirectShortUrlApi, updateShortUrlApi, deleteShortUrlApi };
