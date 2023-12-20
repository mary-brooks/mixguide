import React, { useState } from 'react';
import ingredients from '../ingredients.json';

// Button Component
const Button = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

function SearchOptions() {
  // State for ingredients
  const [fridgeIngredients, setFridgeIngredients] = useState(
    ingredients.fridge
  );
  const [pantryIngredients, setPantryIngredients] = useState(
    ingredients.pantry
  );
  const [cupboardIngredients, setCupboardIngredients] = useState(
    ingredients.cupboard
  );
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // handleClick function for buttons
  const handleButtonClick = (ingredient, category) => {
    // Remove the clicked ingredient from its original category
    switch (category) {
      case 'fridge':
        setFridgeIngredients(prevIngredients =>
          prevIngredients.filter(item => item !== ingredient)
        );
        break;
      case 'pantry':
        setPantryIngredients(prevIngredients =>
          prevIngredients.filter(item => item !== ingredient)
        );
        break;
      case 'cupboard':
        setCupboardIngredients(prevIngredients =>
          prevIngredients.filter(item => item !== ingredient)
        );
        break;
      default:
        break;
    }
    // Add the clicked ingredient to the selectedIngredients array
    setSelectedIngredients(prevSelectedIngredients => [
      ...prevSelectedIngredients,
      ingredient,
    ]);
  };

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
