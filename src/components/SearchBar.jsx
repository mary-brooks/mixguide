import IngredientButton from './IngredientButton';

function SearchBar({ selectedIngredients, handleRemoveClick }) {
  return (
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
  );
}

export default SearchBar;
