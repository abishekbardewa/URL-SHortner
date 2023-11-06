import path from 'path';
import Joi from 'joi';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Loads environment variables from a .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

// Joi schema for validating environment variables
const envVarsSchema = Joi.object()
	.keys({
		NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
		PORT: Joi.number().default(5000),
		MONGODB_URL: Joi.string().required().description('Mongo DB url'),
	})
	.unknown();

// Validates the environment variables using the defined schema
const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
	// Throws an error if there's a validation issue with the environment variables
	throw new Error(`Config validation error: ${error.message}`);
}

// Export configuration settings including API version, environment, port, and MongoDB configuration
export default {
	apiVersionUrl: '/',
	env: envVars.NODE_ENV,
	port: envVars.PORT,
	mongoose: {
		url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
	},
};
