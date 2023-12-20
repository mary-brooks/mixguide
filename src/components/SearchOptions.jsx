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

      <div className='pantry'></div>

      <div className='cupboard'></div>
    </div>
  );
}

export default SearchOptions;
