import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link className="nav-link" to="/cocktails">Search Cocktails</Link>
      <Link className="nav-link" to="/favourites">Favourites</Link>
      <Link className="nav-link" to="/cocktailoftheday">Cocktail of the day</Link>
      <Link className="nav-link" to="/addcocktail">Add Cocktail</Link>
    </nav>
  )
}

export default Navbar;