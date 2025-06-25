import express from 'express';
import { getApodToday, searchApod } from '../controllers/apodController.js';

const router = express.Router();

router.get('/today', getApodToday);// Image of the day
router.get('/search', searchApod);// Filtered APOD

export default router;