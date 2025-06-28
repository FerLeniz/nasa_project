import axios from 'axios';

export const fetchApod = async (params = {}) => {

  const url = `https://api.nasa.gov/planetary/apod`;
  const apiKey = process.env.NASA_API_KEY;
  
  const response = await axios.get(url, {
    params: {
      api_key: apiKey,
      ...params,
    },
  });

  return response.data;
};

export const fetchMars = async (params = {}) => {
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos`;
  const apiKey = process.env.NASA_API_KEY;

  const response = await axios.get(url, {
    params: {
      api_key: apiKey,
      ...params,
    },
  });

  return response.data;
};
