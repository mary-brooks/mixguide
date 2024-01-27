import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import newTabIcon from '../assets/images/new-tab-icon.png';

function SingleList() {
  const { listId } = useParams();

  const [singleList, setSingleList] = useState(null);

  const API_URL = `https://cocktail-app-mock-backend.adaptable.app/lists/${listId}`;

  const getSingleList = async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      setSingleList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleList();
  }, []);

  return (
    <div>
      <Navbar />

      {singleList && (
        <div className='single-list'>
          <h1>{singleList.title}</h1>
          <p>
            Contributed by:
            <span> {singleList.created_by}</span>
          </p>
          <div className='single-list-container'>
            {singleList.cocktails.map(cocktail => {
              return (
                <Link
                  key={cocktail.id}
                  to={`/cocktails/${cocktail.id}`}
                  target='_blank'
                >
                  <div className='recipe-card'>
                    <div className='recipe-card-info'>
                      <div className='image-container'>
                        <img src={cocktail.image} alt={cocktail.recipe_title} />
                      </div>
                      <div className='text-container'>
                        <h2>{cocktail.recipe_title}</h2>
                        <div className='text-container-info'>
                          <p>Alcohol: {cocktail.alcohol_percentage}</p>
                          <p>Calories: {cocktail.calories}</p>
                          <p>Rating: {cocktail.rating}</p>
                        </div>
                      </div>
                    </div>
                    <div className='recipe-card-bottom'>
                      <img src={newTabIcon} alt="new-tab-icon" />
                      </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className='button-container'>
            <Link
              className='update-list-button'
              to={`/lists/updatelist/${listId}`}
            >
              Update list
            </Link>
            <Link className='back-to-lists-button' to='/lists'>
              Back to lists
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleList;
