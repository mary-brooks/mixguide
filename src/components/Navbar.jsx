import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link className="nav-link" to="/cocktails">Search Cocktails</Link>
      <Link className="nav-link" to="/lists">Lists</Link>
      <Link className="nav-link" to="/cocktailoftheday">Cocktail of the day</Link>
    </nav>
  )
}

export default Navbar;