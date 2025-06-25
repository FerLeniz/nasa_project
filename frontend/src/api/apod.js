const API_BASE = 'http://localhost:3001/api/apod';

export const fetchTodayImage = async () => {
  const res = await fetch(`${API_BASE}/today`);
  return res.json();
};

export const fetchApodWithFilters = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/search?${query}`);
  return res.json();
};
