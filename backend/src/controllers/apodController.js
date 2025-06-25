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
    res.json(data);
  } catch (err) {
    next(err);
  }
};
