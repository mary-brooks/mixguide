import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

import homeIcon from '../assets/images/home-page-icon.png';

function CocktailOfTheDayPage() {
  const [cocktailOfTheDay, setCocktailOfTheDay] = useState(null);

  const fetchCocktailOfTheDay = async () => {
    try {
      const response = await fetch(
        'https://cocktail-app-mock-backend.adaptable.app/cocktails'
      );
      const data = await response.json();

      console.log('Fetched Data:', data);

      if (data && data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomCocktail = data[randomIndex];

        console.log('Selected Cocktail:', randomCocktail);

        localStorage.setItem(
          'cocktailOfTheDay',
          JSON.stringify(randomCocktail)
        );
        setCocktailOfTheDay(randomCocktail);
      } else {
        console.error('No valid data received.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const currentDate = localStorage.getItem('currentDate');
    const today = new Date().toDateString();

    if (!currentDate || currentDate !== today) {
      fetchCocktailOfTheDay();
      localStorage.setItem('currentDate', today);
    }

    const storedCocktail = JSON.parse(localStorage.getItem('cocktailOfTheDay'));
    console.log('Stored Cocktail:', storedCocktail);

    setCocktailOfTheDay(storedCocktail);

    const dailyTimerId = setInterval(() => {
      fetchCocktailOfTheDay();
    }, 86400000);

    return () => {
      clearInterval(dailyTimerId);
    };
  }, []);

  console.log('cocktailOfTheDay:', cocktailOfTheDay);

  return (
    <div className='page-container'>
      {cocktailOfTheDay && (
        <>
      <Navbar />
        <div className='cocktail-container'>
          <div className='cocktail-details'>
            <div className='image-container'>
              <img
                src={cocktailOfTheDay.image}
                alt={`image of a ${cocktailOfTheDay.recipe_title}`}
              />
            </div>
            <div className='cocktail-ingredients'>
              <h1>{cocktailOfTheDay.recipe_title}</h1>
              <h2>Ingredients:</h2>
              <ul>
                {cocktailOfTheDay.ingredients.map(ingredient => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
              <h2>Garnish:</h2>
              <ul>
                {cocktailOfTheDay.garnish.map(garnish => (
                  <li key={garnish}>{garnish}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className='cocktail-instructions'>
            <h2>Instructions:</h2>
            <ul>
              {cocktailOfTheDay.instructions.map(instruction => (
                <li key={instruction}>{instruction}</li>
              ))}
            </ul>
            <div className='cocktail-info-container'>
              <div className='cocktail-info'>
                <h3>Alcohol percentage:</h3>
                <span>{cocktailOfTheDay.alcohol_percentage}</span>
              </div>
              <div className='cocktail-info'>
                <h3>Calories:</h3>
                <span>{cocktailOfTheDay.calories}</span>
              </div>
              <div className='cocktail-info'>
                <h3>Rating:</h3>
                <span>{cocktailOfTheDay.rating}</span>
              </div>
            </div>
          </div>
          <Link class='back-to-home' to='/'>
            <img src={homeIcon} alt='home-icon' />
          </Link>
        </div>
    </>
      )}
    </div>
  );
}

export default CocktailOfTheDayPage;
