function IngredientButton({ label, onClick }) {
  return (
    <button className='ingredient-button' onClick={onClick}>
      {label}
    </button>
  );
}

export default IngredientButton;
