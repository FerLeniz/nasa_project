import { useEffect, useState } from 'react';
import { fetchTodayImage } from '../api/apod';

const HomePage = () => {
  const [apod, setApod] = useState(null);

  useEffect(() => {
    fetchTodayImage().then(setApod);
  }, []);

    if (!apod) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <h2 className="text-4xl text-center my-4 font-bold text-black">{apod.title}</h2>
      <p className="text-2xl font-bold text-center my-3 text-gray-500 mt-2">📅 {apod.date}</p>
      <img src={apod.url} alt={apod.title} className="w-full rounded-lg shadow" />
      <p className="mt-5 pb-7 text-3xl text-gray-700">{apod.explanation}</p>
    </div>
  );
};

export default HomePage;