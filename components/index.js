import express from 'express';
import shortUrl from './shortUrl/shortUrlRoute.js';

// Creates an Express router instance
const router = express.Router();

// 'shortUrl' router for routes starting with '/shortUrl'
router.use('/short', shortUrl);

export default router;
