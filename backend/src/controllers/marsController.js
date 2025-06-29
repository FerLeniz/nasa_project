import { fetchMars } from '../services/nasaService.js';

const handleMarsRequest = (buildParams) => async (req, res, next) => {
  try {
    const data = await fetchMars(buildParams(req));
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getMarsPic = handleMarsRequest(() => ({ camera: "NAVCAM", sol: 1000 }));

export const searchMars = handleMarsRequest(req => ({ sol: 1000, page: req.query.page }));