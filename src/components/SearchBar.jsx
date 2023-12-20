import IngredientButton from './IngredientButton';

function SearchBar({ selectedIngredients }) {
  return (
    <div className='search-bar'>
      {selectedIngredients.map((ingredient, index) => (
        <IngredientButton key={index} label={ingredient} />
      ))}
    </div>
  );
}

export default SearchBar;
