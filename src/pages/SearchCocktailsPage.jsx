import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import SearchOptions from '../components/SearchOptions';
import axios from 'axios';
import ingredients from '../ingredients.json';
import { Link } from 'react-router-dom';

function SearchCocktailsPage() {
  // State for ingredients
  const [fridgeIngredients, setFridgeIngredients] = useState(
    ingredients.fridge
  );
  const [pantryIngredients, setPantryIngredients] = useState(
    ingredients.pantry
  );
  const [cupboardIngredients, setCupboardIngredients] = useState(
    ingredients.cupboard
  );
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // State for recipes
  const [cocktails, setCocktails] = useState([]);

  // State for filtered cocktails
  const [filteredCocktails, setFilteredCocktails] = useState([]);

  const API_URL = 'https://cocktail-app-mock-backend.adaptable.app/cocktails';

  const getCocktails = async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      setCocktails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCocktails();
  }, []);

  useEffect(() => {
    // filter cocktails based on selectedIngredients state
    const cocktailResults = cocktails.filter(cocktail => {
      return cocktail.ingredients.every(ingredient => {
        return selectedIngredients
          .map(selected => selected.ingredient)
          .includes(ingredient);
      });
    });

    setFilteredCocktails(cocktailResults);
  }, [selectedIngredients]);

  // handleClick function for buttons
  const handleButtonClick = (ingredient, category) => {
    // Remove the clicked ingredient from its original category
    switch (category) {
      case 'fridge':
        setFridgeIngredients(prevIngredients =>
          prevIngredients.filter(item => item !== ingredient)
        );
        break;
      case 'pantry':
        setPantryIngredients(prevIngredients =>
          prevIngredients.filter(item => item !== ingredient)
        );
        break;
      case 'cupboard':
        setCupboardIngredients(prevIngredients =>
          prevIngredients.filter(item => item !== ingredient)
        );
        break;
      default:
        break;
    }

    // Add the clicked ingredient to the selectedIngredients array
    setSelectedIngredients(prevSelectedIngredients => [
      ...prevSelectedIngredients,
      { ingredient, category }, // include category information
    ]);
  };

  // handleRemoveClick function to remove ingredient from selectedIngredients
  // and add it back to its original category
  const handleRemoveClick = ({ ingredient, category }) => {
    // Remove the ingredient from selectedIngredients
    setSelectedIngredients(prevSelectedIngredients =>
      prevSelectedIngredients.filter(item => item.ingredient !== ingredient)
    );

    // Add the ingredient back to its original category
    switch (category) {
      case 'fridge':
        setFridgeIngredients(prevIngredients =>
          [...prevIngredients, ingredient].sort()
        );
        break;
      case 'pantry':
        setPantryIngredients(prevIngredients => [
          ...prevIngredients,
          ingredient,
        ]);
        break;
      case 'cupboard':
        setCupboardIngredients(prevIngredients => [
          ...prevIngredients,
          ingredient,
        ]);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Navbar />
      <SearchOptions
        handleButtonClick={handleButtonClick}
        fridgeIngredients={fridgeIngredients}
        pantryIngredients={pantryIngredients}
        cupboardIngredients={cupboardIngredients}
      />
      <div className='search-container'>
        <SearchBar
          selectedIngredients={selectedIngredients}
          handleRemoveClick={handleRemoveClick}
        />

        {filteredCocktails.length !== 0 && (
          <h2>You can make these cocktails with your ingredients:</h2>
        )}

        <div className='search-results'>
          {selectedIngredients.length === 0 && <p>Choose some ingredients.</p>}

          {selectedIngredients &&
            filteredCocktails.map(cocktail => {
              return (
                <Link
                  key={cocktail.id}
                  to={`/cocktails/${cocktail.id}`}
                  target='_blank'
                >
                  <div className='recipe-card'>
                    <div className='image-container'>
                      <img src={cocktail.image} alt={cocktail.recipe_title} />
                    </div>
                    <div className='text-container'>
                      <h2>{cocktail.recipe_title}</h2>
                      <p>Alcohol percentage: {cocktail.alcohol_percentage}</p>
                      <p>Calories: {cocktail.calories}</p>
                      <p>Rating: {cocktail.rating}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default SearchCocktailsPage;
