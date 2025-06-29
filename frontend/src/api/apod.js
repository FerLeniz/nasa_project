const API_BASE = 'https://nasa-backend-ht26.onrender.com/api/apod';

export const fetchTodayImage = async () => {
  const res = await fetch(`${API_BASE}/today`);
  return res.json();
};

export const fetchApodWithFilters = async (params = {}) => {
  const query = new URLSearchParams(params).toString();

  const res = await fetch(`${API_BASE}/search?${query}`);
  return res.json();
};
