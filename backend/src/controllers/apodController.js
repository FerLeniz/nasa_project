import { fetchApod } from '../services/nasaService.js';

export const getApodToday = async (req, res, next) => {
  try {
    const data = await fetchApod();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const searchApod = async (req, res, next) => {
  try {
    const { date, start_date, end_date, count, thumbs } = req.query;
    const data = await fetchApod({ date, start_date, end_date, count, thumbs });

    if (count && count > 50) {
      return res.status(400).json({ error: 'Count too high. Max 50 allowed.' });
    }
    if (start_date && end_date) {
      const days = (new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24);
      if (days > 50) {
        return res.status(400).json({ error: 'Date range too large. Max 50 days allowed.' });
      }
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
};
