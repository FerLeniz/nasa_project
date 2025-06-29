import { useEffect, useState } from 'react';
import { fetchTodayImage } from '../api/apod';
import ScrollToTopButton from '../components/ScrollToTopButton';

const HomePage = () => {
  const [apod, setApod] = useState(null);
  const [mars, setMars] = useState([]);

  useEffect(() => {
    fetchTodayImage().then(setApod);

    async function getMarsPhotos() {
      try {
        const response = await fetch("https://nasa-backend-ht26.onrender.com/api/mars/pictures");
        if (!response.ok) throw new Error(`Status: ${response.status}`);

        const json = await response.json();
        console.log("FOTOS: ", json.photos)
        setMars(json.photos || []);
      } catch (error) {
        console.error("Error fetching Mars photos:", error.message);
      }
    }

    getMarsPhotos();
  }, []);

  if (!apod) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <h1 className='text-center font-bold text-4xl py-3'>Astronomy Picture of the Day(APOD):</h1>
      <div className="min-h-screen bg-gray-100">
        <h3 className="text-2xl text-center my-4 font-bold text-black">{apod.title}</h3>
        <p className="text-xl font-bold text-center text-gray-500 mb-3">📅 {apod.date}</p>
        <img src={apod.url} alt={apod.title} className="w-full px-6 rounded-lg shadow" />
        <p className="mt-5 px-5 text-2xl text-gray-700">{apod.explanation}</p>
      </div>

      <div className="mt-10 pt-5 bg-yellow-100">
        <h1 className='text-center font-bold text-4xl py-4'>See some of MARS' pictures</h1>
        {mars.length === 0 ? (
          <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          mars.map((item) => (
            <div key={item.id} className="px-6">
              <img src={item.img_src} alt={`Mars by rover on ${item.earth_date}`} className="mx-auto rounded shadow" />
              <p className="text-center py-4  text-gray-600 mt-2 text-2xl">📅 {item.earth_date}</p>
            </div>
          ))
        )}
      </div>
      <ScrollToTopButton position="left" />
    </>
  );
};

export default HomePage;
