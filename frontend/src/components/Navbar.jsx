import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="w-full bg-black text-white px-4 py-3">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between">
      <h1 className="text-2xl font-bold mb-2 sm:mb-0">🌌 NASA Explorer</h1>
      <div className="flex space-x-8 text-lg font-medium">
        <Link
          to="/"
          className="text-white hover:text-blue-400 hover:underline transition duration-200"
        >
          Home
        </Link>
        <Link
          to="/browse"
          className="text-white hover:text-blue-400 hover:underline transition duration-200"
        >
          Browse
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
