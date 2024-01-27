import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import newTabIcon from '../assets/images/new-tab-icon.png';

const API_URL = 'https://cocktail-app-mock-backend.adaptable.app/cocktails';

function AllCocktailsPage() {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCocktails = async () => {
    try {
      const response = await axios.get(`${API_URL}/`);
      setCocktails(response.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCocktails();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
    <Navbar />
    <div className='all-cocktails page-container'>
      {cocktails.map((cocktail) => {
        return (
          <Link
                    key={cocktail.id}
                    to={`/cocktails/${cocktail.id}`}
                    target='_blank'
                  >
                    <div className='recipe-card'>
                      <div className='recipe-card-info'>
                        <div className='image-container'>
                          <img
                            src={cocktail.image}
                            alt={cocktail.recipe_title}
                          />
                        </div>
                        <div className='text-container'>
                          <h2>{cocktail.recipe_title}</h2>
                          <div className='text-container-info'>
                            <p>Alcohol: {cocktail.alcohol_percentage}</p>
                            <p>Calories: {cocktail.calories}</p>
                            <p>Rating: {cocktail.rating}</p>
                          </div>
                        </div>
                      </div>
                      <div className='recipe-card-bottom'>
                      <img src={newTabIcon} alt="new-tab-icon" />
                      </div>
                    </div>
                  </Link>
                );
              })}
              </div>
          </div>
  );
}

export default AllCocktailsPage;