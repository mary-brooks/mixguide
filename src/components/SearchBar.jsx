import IngredientButton from './IngredientButton';

function SearchBar({ selectedIngredients, handleRemoveClick, toggleMissingIng, toggleMocktailOnly, toggleCocktailOnly, toggleDairyFree, toggleEggsFree, toggleNutsFree, toggleHotOnly, toggleColdOnly }) {
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
        <input
        id='cocktail-only-checkbox'
        type="checkbox"
        onChange={() => toggleCocktailOnly()} />
        <label htmlFor="cocktail-only-checkbox">Cocktails only</label>
        <input
        id='dairy-free-checkbox'
        type="checkbox"
        onChange={() => toggleDairyFree()} />
        <label htmlFor="dairy-free-checkbox">Dairy free</label>
        <input
        id='eggs-free-checkbox'
        type="checkbox"
        onChange={() => toggleEggsFree()} />
        <label htmlFor="eggs-free-checkbox">Eggs free</label>
        <input
        id='nuts-free-checkbox'
        type="checkbox"
        onChange={() => toggleNutsFree()} />
        <label htmlFor="nuts-free-checkbox">Nuts free</label>
        <input
        id='hot-only-checkbox'
        type="checkbox"
        onChange={() => toggleHotOnly()} />
        <label htmlFor="hot-only-checkbox">Hot only</label>
        <input
        id='cold-only-checkbox'
        type="checkbox"
        onChange={() => toggleColdOnly()} />
        <label htmlFor="cold-only-checkbox">Cold only</label>
      </form>
    </div>
    </div>
  );
}

export default SearchBar;
