import IngredientButton from './IngredientButton';

function SearchBar({ selectedIngredients, handleRemoveClick, toggleMissingIng, toggleMocktailOnly }) {
  return (
    <div>
    <div className='search-bar'>
      <div className='hide-scrollbar-search'>
        <h2>Chosen Ingredients:</h2>
        {selectedIngredients.map(({ ingredient, category }, index) => (
          <IngredientButton
            key={index}
            label={ingredient}
            category={category}
            onClick={() => {
              handleRemoveClick({ ingredient, category });
            }}
          />
        ))}
      </div>
    </div>
    <div className='search-filters'>
      <form>
        <input
        id='missing-ing-checkbox'
        type="checkbox"
        onChange={() => toggleMissingIng()} />
        <label htmlFor="missing-ing-checkbox">Missing one ingredient</label>
        <input
        id='mocktail-only-checkbox'
        type="checkbox"
        onChange={() => toggleMocktailOnly()} />
        <label htmlFor="mocktail-only-checkbox">Mocktails only</label>
      </form>
    </div>
    </div>
  );
}

export default SearchBar;
