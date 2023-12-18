import { Link } from "react-router-dom";

function HomePage() {
  return (
   <div className="home-page">
    <Link className="home-page-link" to='/cocktails'><button>Get started</button></Link>
    <Link className="home-page-link" to='/cocktailoftheday'><button>Cocktail of the day</button></Link>
  </div>
  )
}

export default HomePage;
