import IngredientButton from './IngredientButton';

function SearchBar({ selectedIngredients, handleRemoveClick }) {
  return (
    <div className='search-bar'>
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
  );
}

export default SearchBar;
