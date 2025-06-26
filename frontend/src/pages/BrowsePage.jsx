import { useState } from 'react';
import { fetchApodWithFilters } from '../api/apod';

const BrowsePage = () => {
  const today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  // Filter states
  const [count, setCount] = useState(3);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [singleDate, setSingleDate] = useState(today);

  // Handlers
  const handleRandomSearch = () => {
    setLoading(true);
    fetchApodWithFilters({ count })
      .then(setResults)
      .finally(() => setLoading(false));
  };

  const handleDateRangeSearch = () => {
    if (startDate && endDate) {
      setLoading(true);
      fetchApodWithFilters({ start_date: startDate, end_date: endDate })
        .then(setResults)
        .finally(() => setLoading(false));
    }
  };

  const handleSingleDateSearch = () => {
    if (singleDate) {
      setLoading(true);
      fetchApodWithFilters({ date: singleDate })
        .then(data => setResults([data]))
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Filters */}
      <aside className="w-1/5 bg-gray-100 p-4 border-r space-y-6">
        <div>
          <h2 className="font-bold mb-2">🎲 Random APODs</h2>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="border w-full px-2 py-1 rounded mb-2"
          />
          <button
            onClick={handleRandomSearch}
            disabled={loading}
            className={`w-full px-3 py-1 rounded text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
              }`}
          >
            {loading ? 'Loading...' : `Fetch ${count} Random`}
          </button>
        </div>

        <div>
          <h2 className="font-bold mb-2">📆 Date Range</h2>
          <label className="text-sm">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border w-full px-2 py-1 rounded mb-2"
          />
          <label className="text-sm">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border w-full px-2 py-1 rounded mb-2"
          />
          <button
            onClick={handleDateRangeSearch}
            disabled={loading}
            className={`w-full px-3 py-1 rounded text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
              }`}
          >
            {loading ? 'Loading...' : 'Search Range'}
          </button>
        </div>

        <div>
          <h2 className="font-bold mb-2">📅 Specific Date</h2>
          <input
            type="date"
            value={singleDate}
            onChange={(e) => setSingleDate(e.target.value)}
            className="border w-full px-2 py-1 rounded mb-2"
          />
          <button
            onClick={handleSingleDateSearch}
            disabled={loading}
            className={`w-full px-3 py-1 rounded text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
              }`}
          >
            {loading ? 'Loading...' : 'Search Date'}
          </button>
        </div>
      </aside>

      {/* Results Section */}
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
