import { Link } from "react-router-dom";
import logo from '../assets/images/logo2.png';
import starLeft from '../assets/images/star-icon-left.png';
import starRight from '../assets/images/star-icon-right.png';
import 'animate.css';

function HomePage() {
  return (
    <div className="home-page">

        <img className="star-right animate__animated animate__rollIn" src={starRight} alt='star-icon' />

      <img className="logo animate__animated animate__fadeInUp" src={logo} alt='mix-guide-logo' />

        <img className="star-left animate__animated animate__rollIn" src={starLeft} alt='star-icon' />

      <Link className="get-started-btn animate__animated animate__fadeInDown animate__delay-1s" to='/searchcocktails'><button>Get Started</button></Link>

      <div className="hp-buttons-container animate__animated animate__fadeInDown animate__delay-2s">
        <Link className="cocktail-day-btn" to='/cocktailoftheday'><button>Cocktail of the day</button></Link>
        <p>|</p>
        <Link className="all-cocktails-btn" to='/allcocktails'> <button>All cocktails</button></Link>
      </div>

    </div>
  );
}

export default HomePage;