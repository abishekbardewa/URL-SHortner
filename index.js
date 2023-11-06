import express from 'express';
import bodyParser from 'body-parser';
import router from './components/index.js';
import mongoose from 'mongoose';
import config from './config/config.js';
import cors from 'cors';

// Creates an Express application
const app = express();

app.use(express.urlencoded({ extended: false }));

// bodyParser middleware for JSON request body parsing
app.use(bodyParser.json());
app.use(cors());
// Main router for all routes starting with the API version URL
app.use(config.apiVersionUrl, router);

// Root route for a welcome message
app.get('/', (req, res) =>
	res.status(200).json({
		status: 200, //Success
		success: true,
		data: { message: 'Welcome to Short Url Api!' },
	}),
);

// Handles undefined routes
app.all('*', (req, res) =>
	res.status(404).json({
		status: 404, // Bad Request
		success: false,
		data: { message: "You've tried reaching a route that doesn't exist." },
	}),
);

// Connect to MongoDB using the provided URL and options
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
	console.log('Connected to MongoDB');
	// Start the Express server and listen on the specified port
	app.listen(config.port, () => {
		console.log(`Server is running on port http://localhost:${config.port}`);
	});
});
