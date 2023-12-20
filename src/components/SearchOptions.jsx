import React, { useState } from 'react';

// Button Component
const Button = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

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
          <Button
            key={index}
            label={ingredient}
            onClick={() => handleButtonClick(ingredient, 'fridge')}
          />
        ))}
      </div>
      <div className='pantry'>
        <h2>Pantry:</h2>
        {pantryIngredients.map((ingredient, index) => (
          <Button
            key={index}
            label={ingredient}
            onClick={() => handleButtonClick(ingredient, 'pantry')}
          />
        ))}
      </div>
      <div className='cupboard'>
        <h2>Cupboard:</h2>
        {cupboardIngredients.map((ingredient, index) => (
          <Button
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
