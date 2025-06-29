import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import BrowsePageMars from './pages/BrowsePageMars'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browseApod" element={<BrowsePage />} />
          <Route path="/browseMars" element={<BrowsePageMars />} />
        </Routes>
        </div>
    </Router>
  );
}

export default App;
