import ingredients from '../ingredients.json';

function SearchOptions() {
  return (
    <div className='ingredients'>
      <div className='fridge'>
        <h2>Fridge:</h2>
        {ingredients.fridge.map((ingredient, index) => (
          <button key={index}>{ingredient}</button>
        ))}
      </div>

      <div className='pantry'>
        <h2>Pantry:</h2>
        {ingredients.pantry.map((ingredient, index) => (
          <button key={index}>{ingredient}</button>
        ))}
      </div>

      <div className='cupboard'>
        <h2>Cupboard:</h2>
        {ingredients.cupboard.map((ingredient, index) => (
          <button key={index}>{ingredient}</button>
        ))}
      </div>
    </div>
  );
}

export default SearchOptions;
