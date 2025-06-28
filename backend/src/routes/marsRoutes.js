import express from 'express';
import { getMarsPic, searchMars } from '../controllers/marsController.js';

const router = express.Router();

router.get('/pictures', getMarsPic);// get pictures for the home page
router.get('/search', searchMars);// paginated MArs

export default router;