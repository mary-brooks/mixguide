import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function AddListPage() {
  const [title, setTitle] = useState('');
  const [created_by, setCreated_by] = useState('');
  const [cocktails, setCocktails] = useState([]);
  const [cocktailOptions, setCocktailOptions] = useState([]);
  const [chosenCocktails, setChosenCocktails] = useState([]);

  const navigate = useNavigate();

  const handleTitle = e => {
    setTitle(e.target.value);
  };

  const handleCreated_by = e => {
    setCreated_by(e.target.value);
  };

  const handleCocktails = e => {
    const selectedCocktail = e.target.value;
    const updatedCocktails = cocktails.includes(selectedCocktail)
      ? cocktails.filter(cocktail => cocktail !== selectedCocktail)
      : [...cocktails, selectedCocktail];

    // Use filter to get the matching cocktail details from cocktailOptions
    const cocktailDetails = cocktailOptions.filter(option =>
      updatedCocktails.includes(option.recipe_title)
    );

    setChosenCocktails(cocktailDetails);

    setCocktails(updatedCocktails);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await addList();
  };

  const addList = async () => {
    try {
      const request = {
        title,
        created_by,
        cocktails: chosenCocktails,
      };

      await axios.post(
        `https://cocktail-app-mock-backend.adaptable.app/lists`,
        request
      );

      setTitle('');
      setCreated_by('');
      setCocktails([]);

      alert('List added successfully!');

      navigate('/lists');
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  const getCocktailOptions = async () => {
    try {
      const response = await axios.get(
        `https://cocktail-app-mock-backend.adaptable.app/cocktails`
      );
      setCocktailOptions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCocktailOptions();
  }, []);

  return (
    <div>
      <Navbar />

      <form className='addListForm' onSubmit={handleSubmit}>
        <div className='form-text-field'>
          <label htmlFor='title'>Title:</label>
          <input
            onChange={handleTitle}
            type='text'
            id='title'
            name='title'
            value={title}
          />
        </div>

        <div className='form-text-field'>
          <label htmlFor='created_by'>Created by:</label>
          <input
            onChange={handleCreated_by}
            type='text'
            id='created_by'
            name='created_by'
            value={created_by}
          />
        </div>

        <div className='checkboxes-container'>
          <label htmlFor='cocktails'>Select cocktails:</label>
          <div className='checkboxes'>
            {cocktailOptions &&
              cocktailOptions.map(cocktail => {
                return (
                  <div key={cocktail.id} className='checkbox-item'>
                    <input
                      className='checkmark'
                      onChange={handleCocktails}
                      type='checkbox'
                      id={cocktail.recipe_title}
                      name={cocktail.recipe_title}
                      value={cocktail.recipe_title}
                      checked={cocktails.includes(cocktail.recipe_title)}
                    />
                    <label htmlFor={cocktail.recipe_title}>
                      {cocktail.recipe_title}
                    </label>
                  </div>
                );
              })}
          </div>
        </div>

        <button type='submit' className='submit-list-button'>
          Add list
        </button>
      </form>
    </div>
  );
}

export default AddListPage;
