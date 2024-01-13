import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

function CocktailOfTheDayPage() {
  const [cocktailOfTheDay, setCocktailOfTheDay] = useState(null);

  useEffect(() => {
    const fetchCocktailOfTheDay = async () => {
      try {
        const response = await fetch('https://cocktail-app-mock-backend.adaptable.app/cocktails');
        const data = await response.json();

        // Retrieve the selected cocktail from local storage
        const storedCocktail = localStorage.getItem('cocktailOfTheDay');

        if (storedCocktail) {
          // If a cocktail is already stored, use it
          setCocktailOfTheDay(JSON.parse(storedCocktail));
        } else {
          // Otherwise, select a new cocktail and store it
          const randomIndex = Math.floor(Math.random() * data.length);
          const randomCocktail = data[randomIndex];
          localStorage.setItem('cocktailOfTheDay', JSON.stringify(randomCocktail));
          setCocktailOfTheDay(randomCocktail);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch the Cocktail of the Day on component mount
    fetchCocktailOfTheDay();

    // Calculate the time until the next midnight
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const timeUntilMidnight = midnight.getTime() - now.getTime();

    // Set up a timer to fetch a new cocktail at midnight each day
    const midnightTimerId = setTimeout(() => {
      fetchCocktailOfTheDay();
      // Set up a new timer for the next midnight
      const dailyTimerId = setInterval(fetchCocktailOfTheDay, 86400000); // 24 hours interval
      // Store the daily timer ID in local storage for cleanup
      localStorage.setItem('dailyTimerId', dailyTimerId.toString());
    }, timeUntilMidnight);

    // Clean up the timers when the component is unmounted
    return () => {
      clearTimeout(midnightTimerId);
      // Clear the daily timer using its ID stored in local storage
      const dailyTimerId = localStorage.getItem('dailyTimerId');
      if (dailyTimerId) {
        clearInterval(parseInt(dailyTimerId, 10));
      }
    };
  }, []);

  return (
  <div>
  <Navbar />
  {cocktailOfTheDay && (
    <div className='cocktail-details'>
      <img src={cocktailOfTheDay.image} alt={`image of a ${cocktailOfTheDay.recipe_title}`} />
      <h1>{cocktailOfTheDay.recipe_title}</h1>
      <h2>Ingredients:</h2>
      <ul>
        {cocktailOfTheDay.ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <h2>Garnish:</h2>
      <ul>
        {cocktailOfTheDay.garnish.map((garnish) => (
          <li key={garnish}>{garnish}</li>
        ))}
      </ul>
      <h2>Instructions:</h2>
      <ul>
        {cocktailOfTheDay.instructions.map((instruction) => (
          <li key={instruction}>{instruction}</li>
        ))}
      </ul>
      <h3>Alcohol percentage:</h3>
      <span>{cocktailOfTheDay.alcohol_percentage}</span>
      <h3>Calories:</h3>
      <span>{cocktailOfTheDay.calories}</span>
      <h3>Rating:</h3>
      <span>{cocktailOfTheDay.rating}</span>
    </div>
  )}

  <Link className='backToListsButton' to="/lists">Back to lists</Link>
  <Link className='backToSearchButton' to="/cocktails">Back to search</Link>
</div>
);
}

export default CocktailOfTheDayPage;
