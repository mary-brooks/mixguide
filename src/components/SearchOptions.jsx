import ingredients from '../ingredients.json'

function SearchOptions() {
  return (
    <div className='ingredients'>

      <div className='fridge'>
        console.log(ingredients.fridge);
       {/*  ingredients && ingredients.fridge.map((ingredient) => {
          return (
            <button key={ingredient.id}>{ingredient}</button>
          );
        }) */}
      </div>

      <div className='pantry'>
        
      </div>

      <div className='cupboard'>
        
      </div>

    </div>
  )
}

export default SearchOptions;
