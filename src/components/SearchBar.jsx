function SearchBar({ selectedIngredients }) {
  return (
    <div className='search-bar'>
      {selectedIngredients.map((ingredient, index) => (
        <button key={index}>{ingredient}</button>
      ))}
    </div>
  );
}

export default SearchBar;
