import axios from 'axios';

export const fetchApod = async (params = {}) => {
  const apiKey = process.env.NASA_API_KEY;
  const url = `https://api.nasa.gov/planetary/apod`;

  const response = await axios.get(url, {
    params: {
      api_key: apiKey,
      ...params,
    },
  });

  return response.data;
};
