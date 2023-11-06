import Joi from 'joi';

// Joi schema for Short Url validation
const shortUrlJoiSchema = Joi.object({
	originalUrl: Joi.string()
		.uri({ scheme: ['http', 'https'] })
		.required()
		.messages({
			'string.base': 'Original URL must be a string',
			'string.empty': 'Original URL is required',
			'string.uri': 'Original URL must be a valid HTTP or HTTPS URL',
			'any.required': 'Original URL is required',
		}),
});

export { shortUrlJoiSchema };
