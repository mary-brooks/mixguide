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

  // State for missing one ingredient checkbox
  const [showMissingIngredient, setShowMissingIngredient] = useState(false);

  // State for mocktail only filter
  const [mocktailOnly, setMocktailOnly] = useState(false);

  // State for cocktail only filter
  const [cocktailOnly, setCocktailOnly] = useState(false);

  // State for dairy free filter
  const [dairyFree, setDairyFree] = useState(false);

  // State for eggs free filter
  const [eggsFree, setEggsFree] = useState(false);

  // State for nuts free filter
  const [nutsFree, setNutsFree] = useState(false);

  // State for hot filter
  const [hotOnly, setHotOnly] = useState(false);

  // State for cold filter
  const [coldOnly, setColdOnly] = useState(false);

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
      let selectedCount = 0;

      // Check if each ingredient in the cocktail matches each selected ingredient
      cocktail.ingredients.forEach(ingredient => {
        if (
          selectedIngredients
            .map(selected => selected.ingredient)
            .includes(ingredient)
        ) {
          // Increment the count for each match
          selectedCount++;
        }
      });

      // Check if the user has selected every ingredient or is missing at most one
      const missingIngredientCondition = showMissingIngredient
        ? selectedCount === cocktail.ingredients.length - 1 ||
          selectedCount === cocktail.ingredients.length
        : selectedCount === cocktail.ingredients.length;

      // Check if it's a mocktail
      const mocktailCondition = mocktailOnly ? cocktail.is_mocktail : true;

      // Check if it's a cocktail
      const cocktailCondition = cocktailOnly ? cocktail.is_cocktail : true;

      // Check if it's dairy free
      const dairyFreeCondition = dairyFree ? cocktail.is_dairyFree : true;

      // Check if it's eggs free
      const eggsFreeCondition = eggsFree ? cocktail.is_eggsFree : true;

      // Check if it's nuts free
      const nutsFreeCondition = nutsFree ? cocktail.is_nutsFree : true;

      // Check if it's hot
      const hotCondition = hotOnly ? cocktail.is_hot : true;

      // Check if it's cold
      const coldCondition = coldOnly ? cocktail.is_cold : true;

      // Combine the conditions based on user-selected filters
      return (
        missingIngredientCondition &&
        mocktailCondition &&
        cocktailCondition &&
        dairyFreeCondition &&
        eggsFreeCondition &&
        nutsFreeCondition &&
        hotCondition &&
        coldCondition
      );
    });

    setFilteredCocktails(cocktailResults);
  }, [
    selectedIngredients,
    showMissingIngredient,
    mocktailOnly,
    cocktailOnly,
    dairyFree,
    eggsFree,
    nutsFree,
    hotOnly,
    coldOnly,
  ]);

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
        setPantryIngredients(prevIngredients =>
          [...prevIngredients, ingredient].sort()
        );
        break;
      case 'cupboard':
        setCupboardIngredients(prevIngredients =>
          [...prevIngredients, ingredient].sort()
        );
        break;
      default:
        break;
    }
  };

  // function to toggle missing ingredient checkbox
  const toggleMissingIng = () => {
    setShowMissingIngredient(!showMissingIngredient);
  };

  // helper function to check if a cocktail recipe has a missing ingredient
  function findMissingIngredient(cocktail) {
    const selectedIngredientsSet = new Set(
      selectedIngredients.map(selected => selected.ingredient)
    );

    for (const ingredient of cocktail.ingredients) {
      if (!selectedIngredientsSet.has(ingredient)) {
        return ingredient;
      }
    }

    return null; // Return null if no missing ingredient found
  }

  // function to toggle mocktail only checkbox
  const toggleMocktailOnly = () => {
    setMocktailOnly(!mocktailOnly);
  };

  // function to toggle mocktail only checkbox
  const toggleCocktailOnly = () => {
    setCocktailOnly(!cocktailOnly);
  };

  // function to toggle dairy free checkbox
  const toggleDairyFree = () => {
    setDairyFree(!dairyFree);
  };

  // function to toggle eggs free checkbox
  const toggleEggsFree = () => {
    setEggsFree(!eggsFree);
  };

  // function to toggle nuts free checkbox
  const toggleNutsFree = () => {
    setNutsFree(!nutsFree);
  };

  // function to toggle hot only checkbox
  const toggleHotOnly = () => {
    setHotOnly(!hotOnly);
  };

  const toggleColdOnly = () => {
    setColdOnly(!coldOnly);
  };

  return (
    <div>
      <Navbar />
      <div className='search-cocktails-page'>
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
            toggleMissingIng={toggleMissingIng}
            toggleMocktailOnly={toggleMocktailOnly}
            toggleCocktailOnly={toggleCocktailOnly}
            toggleDairyFree={toggleDairyFree}
            toggleEggsFree={toggleEggsFree}
            toggleNutsFree={toggleNutsFree}
            toggleHotOnly={toggleHotOnly}
            toggleColdOnly={toggleColdOnly}
          />

          <div className='search-results'>
            {filteredCocktails.length !== 0 && (
              <h2>You can make these cocktails with your ingredients:</h2>
            )}
            {selectedIngredients.length === 0 && (
              <p>Select your ingredients to start</p>
            )}

            {selectedIngredients &&
              filteredCocktails.map(cocktail => {
                const missingIngredient = findMissingIngredient(cocktail);
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
                      {missingIngredient && (
                        <p>
                          You are missing{' '}
                          <span className='missing-ing'>
                            {missingIngredient}
                          </span>
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchCocktailsPage;
