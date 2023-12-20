import IngredientButton from './IngredientButton';

function SearchBar({ selectedIngredients, handleRemoveClick }) {
  return (
    <div className='search-bar'>
      {selectedIngredients.map((ingredient, index) => (
        <IngredientButton
          key={index}
          label={ingredient}
          onClick={() => {
            handleRemoveClick(ingredient);
          }}
        />
      ))}
    </div>
  );
}

export default SearchBar;
