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
              <span>X</span>
              <span className='hide animate__animated animate__fadeInLeft animate__faster'>
                clear all
              </span>
            </button>
          )}
        </div>
      </div>
      <div className='search-filters'>
        <div className='checkboxes'>
          <div className='checkbox-item'>
            <input
              id='missing-ing-checkbox'
              type='checkbox'
              onChange={() => toggleMissingIng()}
            />
            <label htmlFor='missing-ing-checkbox'>Missing one ingredient</label>
          </div>

          <div className='checkbox-item'>
            <input
              id='mocktail-only-checkbox'
              type='checkbox'
              onChange={() => toggleMocktailOnly()}
            />
            <label htmlFor='mocktail-only-checkbox'>Mocktails only</label>
          </div>

          <div className='checkbox-item'>
            <input
              id='cocktail-only-checkbox'
              type='checkbox'
              onChange={() => toggleCocktailOnly()}
            />
            <label htmlFor='cocktail-only-checkbox'>Cocktails only</label>
          </div>

          <div className='checkbox-item'>
            <input
              id='hot-only-checkbox'
              type='checkbox'
              onChange={() => toggleHotOnly()}
            />
            <label htmlFor='hot-only-checkbox'>Hot only</label>
          </div>

          <div className='checkbox-item'>
            <input
              id='cold-only-checkbox'
              type='checkbox'
              onChange={() => toggleColdOnly()}
            />
            <label htmlFor='cold-only-checkbox'>Cold only</label>
          </div>

          <div className='checkbox-item'>
            <input
              id='dairy-free-checkbox'
              type='checkbox'
              onChange={() => toggleDairyFree()}
            />
            <label htmlFor='dairy-free-checkbox'>Dairy free</label>
          </div>

          <div className='checkbox-item'>
            <input
              id='eggs-free-checkbox'
              type='checkbox'
              onChange={() => toggleEggsFree()}
            />
            <label htmlFor='eggs-free-checkbox'>Eggs free</label>
          </div>

          <div className='checkbox-item'>
            <input
              id='nuts-free-checkbox'
              type='checkbox'
              onChange={() => toggleNutsFree()}
            />
            <label htmlFor='nuts-free-checkbox'>Nuts free</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
