import IngredientButton from './IngredientButton';

function SearchBar({ selectedIngredients, handleRemoveClick }) {
  return (
    <div className='search-bar'>
      {selectedIngredients.map(({ingredient, category}, index) => (
        <IngredientButton
          key={index}
          label={ingredient}
          category = {category}
          onClick={() => {
            handleRemoveClick({ingredient, category});
          }}
        />
      ))}
    </div>
  );
}

export default SearchBar;
