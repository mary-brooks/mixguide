import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
          <h2>{singleList.title}</h2>
          <h3>Contributed by: {singleList.created_by}</h3>
          {singleList.cocktails.map(cocktail => {
            return (
              <Link key={cocktail.id}>
                <div className='recipe-card'>
                  <img src={cocktail.image_url} alt={cocktail.recipe_title} />
                  <h2>{cocktail.recipe_title}</h2>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SingleList;
