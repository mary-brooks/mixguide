import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const API_URL = "https://cocktail-app-mock-backend.adaptable.app/lists/";

function UpdateListPage() {
  const [title, setTitle] = useState("");
  const [created_by, setCreated_by] = useState("");
  const [cocktails, setCocktails] = useState([]);
  const [cocktailOptions, setCocktailOptions] = useState([]);
  const [chosenCocktails, setChosenCocktails] = useState([]);

  const { listId } = useParams();
  const navigate = useNavigate();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleCreated_by = (e) => {
    setCreated_by(e.target.value);
  };

  const handleCocktails = (e) => {
    const selectedCocktail = e.target.value;
    const updatedCocktails = cocktails.includes(selectedCocktail)
      ? cocktails.filter((cocktail) => cocktail !== selectedCocktail)
      : [...cocktails, selectedCocktail];

    const cocktailDetails = cocktailOptions.filter((option) =>
      updatedCocktails.includes(option.recipe_title)
    );

    setChosenCocktails(cocktailDetails);
    setCocktails(updatedCocktails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { title, created_by, cocktails: chosenCocktails };

    axios.put(`${API_URL}${listId}`, requestBody).then((response) => {
      navigate(`/lists/${listId}`);
    });
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

  const getList = async () => {
    try {
      const response = await axios.get(`${API_URL}${listId}`);
      const singleList = response.data;

      setTitle(singleList.title);
      setCreated_by(singleList.created_by);
      setChosenCocktails(singleList.cocktails);

      const cocktailNames = singleList.cocktails.map((cocktail) => {
        return cocktail.recipe_title;
      });

      setCocktails(cocktailNames);
    } catch (error) {
      console.error('Error updating list:', error);
    }
  };

  useEffect(() => {
    getList();
  }, [listId]);

  const deleteList = () => {
    axios
    .delete(`${API_URL}${listId}`)
    .then(() => {
        navigate("/lists")
    })
    .catch((error) => console.log('Error deleting list:', error))
  }

  return (
    <div>
      <Navbar />
      <form className="addListForm" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          onChange={handleTitle}
          type="text"
          id="title"
          name="title"
          value={title}
        />

        <label htmlFor="created_by">Created by</label>
        <input
          onChange={handleCreated_by}
          type="text"
          id="created_by"
          name="created_by"
          value={created_by}
        />

        <label htmlFor="cocktails">Select cocktails</label>
        <div className="checkboxes">
          {cocktailOptions &&
            cocktailOptions.map((cocktail) => {
              return (
                <div key={cocktail.id} className="checkbox-item">
                  <input
                    onChange={handleCocktails}
                    type="checkbox"
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
        <button type="submit">Update list</button>
        <button onClick={deleteList}>Delete list</button>
        <Link className='backToListsButton' to="/lists">Back to lists</Link>
      </form>
    </div>
  );
}

export default UpdateListPage;