import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import SearchOptions from '../components/SearchOptions';

import { useState } from 'react';

import ingredients from '../ingredients.json';

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
      ingredient,
    ]);
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
      <SearchBar selectedIngredients={selectedIngredients} />
    </div>
  );
}

export default SearchCocktailsPage;
