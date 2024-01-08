import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import SearchOptions from '../components/SearchOptions';
import axios from 'axios';
import ingredients from '../ingredients.json';
import { Link } from 'react-router-dom';

function SearchCocktailsPage() {
  // State for ingredients
  const [fridgeIngredients, setFridgeIngredients] = useState(ingredients.fridge);
  const [pantryIngredients, setPantryIngredients] = useState(ingredients.pantry);
  const [cupboardIngredients, setCupboardIngredients] = useState(ingredients.cupboard);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // State for recipes
  const [cocktails, setCocktails] = useState("");


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

  console.log(cocktails);
  

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
        setFridgeIngredients(prevIngredients => [...prevIngredients, ingredient]);
        break;
      case 'pantry':
        setPantryIngredients(prevIngredients => [...prevIngredients, ingredient]);
        break;
      case 'cupboard':
        setCupboardIngredients(prevIngredients => [...prevIngredients, ingredient]);
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
      <SearchBar
        selectedIngredients={selectedIngredients}
        handleRemoveClick={handleRemoveClick}
      />
      <div className='search-results'>
      {cocktails &&
        cocktails.map(cocktail => {
          return (
            <Link key={cocktail.id}>
              <div className='recipe-card'>
                <img src={cocktail.image_url} alt={cocktail.recipe_title} />
                <h2>{cocktail.recipe_title}</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SearchCocktailsPage;
