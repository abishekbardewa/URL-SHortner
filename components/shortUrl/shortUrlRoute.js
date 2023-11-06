import express from 'express';
import { createShortUrlApi, getShortUrlsApi, deleteShortUrlApi, updateShortUrlApi, redirectShortUrlApi } from './shortUrlController.js';

const router = express.Router();

// route controller with their respective HTTP methods and paths
router.post('/', createShortUrlApi); // Creates a new createShortUrl
router.get('/:shortUrlId', redirectShortUrlApi); // Redirects based on its shortUrlId
router.get('/', getShortUrlsApi); // Get a createShortUrl based on its id
router.put('/:id', updateShortUrlApi); // Update the details of a specific by ID
router.delete('/:id', deleteShortUrlApi); // Delete  specific by ID

export default router;
