// components/ScrollToTopButton.jsx
import { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi'; // Feather icon

const ScrollToTopButton = ({ position = 'right' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const positionClass = position === 'left' ? 'left-6' : 'right-6';

  return isVisible ? (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 ${positionClass} p-3 bg-blue-600 text-white text-3xl rounded-full shadow-lg hover:bg-blue-700 transition-all cursor-pointer`}
      aria-label="Scroll to top"
    >
      <FiArrowUp/>
    </button>
  ) : null;
};

export default ScrollToTopButton;
