import React, { useState } from 'react';
import IngredientButton from './IngredientButton';

function SearchOptions({
  handleButtonClick,
  fridgeIngredients,
  pantryIngredients,
  cupboardIngredients,
}) {
  return (
    <div className='ingredients'>
      <div className='fridge'>
        <h2>Fridge:</h2>
        {fridgeIngredients.map((ingredient, index) => (
          <IngredientButton
            key={index}
            label={ingredient}
            onClick={() => handleButtonClick(ingredient, 'fridge')}
          />
        ))}
      </div>
      <div className='pantry'>
        <h2>Pantry:</h2>
        {pantryIngredients.map((ingredient, index) => (
          <IngredientButton
            key={index}
            label={ingredient}
            onClick={() => handleButtonClick(ingredient, 'pantry')}
          />
        ))}
      </div>
      <div className='cupboard'>
        <h2>Cupboard:</h2>
        {cupboardIngredients.map((ingredient, index) => (
          <IngredientButton
            key={index}
            label={ingredient}
            onClick={() => handleButtonClick(ingredient, 'cupboard')}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchOptions;
