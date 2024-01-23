import IngredientButton from './IngredientButton';

function SearchBar({
  selectedIngredients,
  handleRemoveClick,
  toggleMissingIng,
  toggleMocktailOnly,
  toggleCocktailOnly,
  toggleDairyFree,
  toggleEggsFree,
  toggleNutsFree,
  toggleHotOnly,
  toggleColdOnly,
}) {
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
        {selectedIngredients.length > 0 && (
            <button
              className='clear-all-button'
              onClick={() => {
                selectedIngredients.forEach(({ ingredient, category }) => {
                  handleRemoveClick({ ingredient, category });
                });
              }}
            >
              <span>
                X
              </span>
              <span className='hide animate__animated animate__fadeInLeft animate__faster'>clear all</span>
            </button>
          )}
      </div>
    </div>
    <div className='search-filters'>

      <div className='filters-container'>
      <div className="filters-input">
        <input
        id='missing-ing-checkbox'
        type="checkbox"
        onChange={() => toggleMissingIng()} />
        <label className='filter-label' htmlFor="missing-ing-checkbox">Missing one ingredient</label>
      </div>

      <div className="filters-input">
        <input
        id='mocktail-only-checkbox'
        type="checkbox"
        onChange={() => toggleMocktailOnly()} />
        <label className='filter-label' htmlFor="mocktail-only-checkbox">Mocktails only</label>
      </div>

      <div className="filters-input">
        <input
        id='cocktail-only-checkbox'
        type="checkbox"
        onChange={() => toggleCocktailOnly()} />
        <label className='filter-label' htmlFor="cocktail-only-checkbox">Cocktails only</label>
      </div>

      <div className="filters-input">
        <input
        id='hot-only-checkbox'
        type="checkbox"
        onChange={() => toggleHotOnly()} />
        <label className='filter-label' htmlFor="hot-only-checkbox">Hot only</label>
      </div>

      <div className="filters-input">
        <input
        id='cold-only-checkbox'
        type="checkbox"
        onChange={() => toggleColdOnly()} />
        <label className='filter-label' htmlFor="cold-only-checkbox">Cold only</label>
      </div>

      <div className="filters-input">
        <input
        id='dairy-free-checkbox'
        type="checkbox"
        onChange={() => toggleDairyFree()} />
        <label className='filter-label' htmlFor="dairy-free-checkbox">Dairy free</label>
      </div>

      <div className="filters-input">
        <input
        id='eggs-free-checkbox'
        type="checkbox"
        onChange={() => toggleEggsFree()} />
        <label className='filter-label' htmlFor="eggs-free-checkbox">Eggs free</label>
      </div>

      <div className="filters-input">
        <input
        id='nuts-free-checkbox'
        type="checkbox"
        onChange={() => toggleNutsFree()} />
        <label className='filter-label' htmlFor="nuts-free-checkbox">Nuts free</label>
      </div>
      </div>
    </div>
    </div>
  );
}

export default SearchBar;
