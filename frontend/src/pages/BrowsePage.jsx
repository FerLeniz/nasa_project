import { useState } from 'react';
import { fetchApodWithFilters } from '../api/apod';
import toast, { Toaster } from 'react-hot-toast';

const pad = (n) => n.toString().padStart(2, '0');
const todayStr = `${new Date().getFullYear()}-${pad(new Date().getMonth() + 1)}-${pad(new Date().getDate())}`;
const isFutureDate = (dateStr) => new Date(dateStr).getTime() > new Date().getTime();
const MAX_RANGE_DAYS = 50;

const BrowsePage = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const [count, setCount] = useState(3);
  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(todayStr);
  const [singleDate, setSingleDate] = useState(todayStr);

  const handleRandomSearch = () => {
    setLoading(true);
    fetchApodWithFilters({ count })
      .then(setResults)
      .catch(() => toast.error('Failed to fetch random images.'))
      .finally(() => setLoading(false));
  };

  const handleDateRangeSearch = () => {
    const days = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);

    if (isFutureDate(startDate) || isFutureDate(endDate)) {
      toast.error('Dates cannot be in the future.');
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      toast.error('End date cannot be earlier than start date.');
      return;
    }

    if (days > MAX_RANGE_DAYS) {
      toast.error(`Range too large. Max ${MAX_RANGE_DAYS} days.`);
      return;
    }

    setLoading(true);
    fetchApodWithFilters({ start_date: startDate, end_date: endDate })
      .then(setResults)
      .catch(() => toast.error('Failed to fetch date range.'))
      .finally(() => setLoading(false));
  };

  const handleSingleDateSearch = () => {
    if (!singleDate || isFutureDate(singleDate)) {
      toast.error('Invalid or future date.');
      return;
    }

    setLoading(true);
    fetchApodWithFilters({ date: singleDate })
      .then((data) => setResults([data]))
      .catch(() => toast.error('No data found for that date.'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster />

      {/* Sidebar Filters */}
      <aside className="w-1/5 bg-white p-4 border-r space-y-6 shadow-sm">
        {/* 🎲 Random */}
        <div>
          <h2 className="font-bold mb-2">🎲 Random APODs</h2>
          <input
            type="number"
            value={count}
            min={1}
            max={50} // Limit user to max 50
            onChange={(e) => {
              const val = parseInt(e.target.value);

              if (val === 0) {
                toast.error("minimum is 1 image");
                setCount(1);
              } else if (val > 50) {
                toast.error("Maximum is 50 images.");
                setCount(50);
              } else {
                setCount(val);
              }
            }}
            className="border w-full px-2 py-1 rounded mb-2"
          />
          <button
            onClick={handleRandomSearch}
            disabled={loading}
            className={`w-full px-3 py-1 rounded text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'}`}
          >
            {loading ? 'Loading...' : `Fetch ${count} Random`}
          </button>
        </div>

        {/* 📆 Date Range */}
        <div>
          <h2 className="font-bold mb-2">📆 Date Range</h2>
          <label className="text-sm block mb-1">Start Date</label>
          <input
            type="date"
            max={todayStr}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border w-full px-2 py-1 rounded mb-2"
          />
          <label className="text-sm block mb-1">End Date</label>
          <input
            type="date"
            max={todayStr}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border w-full px-2 py-1 rounded mb-2"
          />
          <button
            onClick={handleDateRangeSearch}
            disabled={loading}
            className={`w-full px-3 py-1 rounded text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'}`}
          >
            {loading ? 'Loading...' : 'Search Range'}
          </button>
        </div>

        {/* 📅 Specific Date */}
        <div>
          <h2 className="font-bold mb-2">📅 Specific Date</h2>
          <input
            type="date"
            max={todayStr}
            value={singleDate}
            onChange={(e) => setSingleDate(e.target.value)}
            className="border w-full px-2 py-1 rounded mb-2"
          />
          <button
            onClick={handleSingleDateSearch}
            disabled={loading}
            className={`w-full px-3 py-1 rounded text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'}`}
          >
            {loading ? 'Loading...' : 'Search Date'}
          </button>
        </div>
      </aside>

      {/* 🛰️ Results */}
      <main className="w-4/5 p-6">
        <h1 className="text-2xl font-semibold mb-6">🛰️ Search Results</h1>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : results.length === 0 ? (
          <p className="text-gray-600">No results yet. Use filters to search APODs.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((item) => (
              <div key={item.date} className="bg-white rounded-lg shadow p-3">
                <img
                  src={item.url}
                  alt={item.title}
                  className="rounded mb-2 aspect-video object-cover"
                />
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.date}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BrowsePage;
