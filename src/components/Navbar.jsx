import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

  // State to change nav color on scroll:
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Function to handle scroll
    function handleScroll() {
      const scrollPosition = window.scrollY;

      const scrollThreshold = 20; // scroll threshold

      setIsScrolled(scrollPosition > scrollThreshold); // updating state
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav style={{ backgroundColor: isScrolled ? '#fffff2' : 'rgba(255, 255, 242, 0.1)' }}>
      <Link className="nav-link" to="/searchcocktails">
        Search Cocktails
      </Link>
      <Link className="nav-link" to="/lists">
        Lists
      </Link>
      <Link className="nav-link" to="/cocktailoftheday">
        Cocktail of the day
      </Link>
      <Link className="nav-link" to="/allcocktails">
        All cocktails
      </Link>
    </nav>
  );
}

export default Navbar;
