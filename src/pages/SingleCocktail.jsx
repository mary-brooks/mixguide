import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import homeIcon from '../assets/images/home-page-icon.png';

function CocktailDetails() {
  const { cocktailId } = useParams();

  const [cocktailDetails, setCocktailDetails] = useState(null);

  const getCocktailDetails = async () => {
    try {
      const response = await axios.get(
        `https://cocktail-app-mock-backend.adaptable.app/cocktails/${cocktailId}`
      );
      setCocktailDetails(response.data);
    } catch (error) {
      console.error('Error loading cocktail:', error);
    }
  };

  useEffect(() => {
    getCocktailDetails();
  }, []);

  return (
    <div>
      <Navbar />
      {cocktailDetails && (
        <div className='cocktail-container'>
          <div className='cocktail-details'>
            <div className='image-container'>
              <img
                src={cocktailDetails.image}
                alt={`image of a ${cocktailDetails.recipe_title}`}
              />
            </div>
            <div className='cocktail-ingredients'>
              <h1>{cocktailDetails.recipe_title}</h1>
              <h2>Ingredients:</h2>
              <ul>
                {cocktailDetails.ingredients.map(ingredient => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
              <h2>Garnish:</h2>
              <ul>
                {cocktailDetails.garnish.map(garnish => (
                  <li key={garnish}>{garnish}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className='cocktail-instructions'>
            <h2>Instructions:</h2>
            <ul>
              {cocktailDetails.instructions.map(instruction => (
                <li key={instruction}>{instruction}</li>
              ))}
            </ul>
          </div>
          <div className='cocktail-info-container'>
            <div className='cocktail-info'>
              <h3>Alcohol percentage:</h3>
              <span>{cocktailDetails.alcohol_percentage}</span>
            </div>
            <div className='cocktail-info'>
              <h3>Calories:</h3>
              <span>{cocktailDetails.calories}</span>
            </div>
            <div className='cocktail-info'>
              <h3>Rating:</h3>
              <span>{cocktailDetails.rating}</span>
            </div>
          </div>
          <Link class='back-to-home' to='/'>
            <img src={homeIcon} alt='home-icon' />
          </Link>
        </div>
      )}
    </div>
  );
}

export default CocktailDetails;
