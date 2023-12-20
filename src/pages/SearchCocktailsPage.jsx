import Navbar from '../components/Navbar';
import SearchOptions from '../components/SearchOptions';
import Ingredients from '../ingredients.json';

import { useState } from 'react';

function SearchCocktailsPage() {
  const [ingredients, setIngredients] = useState(Ingredients);

  return (
    <div>
      <Navbar />
      <SearchOptions ingredients={ingredients} />
    </div>
  );
}

export default SearchCocktailsPage;
