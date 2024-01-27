import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import cocktailIllustration from '../assets/images/cocktail-list-default.png';

function ListsPage() {
  const [lists, setLists] = useState([]);

  const API_URL = 'https://cocktail-app-mock-backend.adaptable.app/lists';

  const getLists = async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      setLists(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLists();
  }, []);

  return (
    <div>
      <Navbar />

      <Link className='add-list-button' to='/lists/addlist'>
        Create new list
      </Link>

      <div className='lists-container'>
        {lists &&
          lists.map(list => {
            return (
              <Link key={list.id} to={`/lists/${list.id}`}>
                <div className='list-card'>
                  <div className='image-container'>
                    {
                      list.imgURL ? <img src={list.imgURL}
                        alt='list cover image'/> : <img
                        src={cocktailIllustration}
                        alt='cocktail illustration'
                      />
                    }
                  </div>
                  <div className='text-container'>
                    <h2>{list.title}</h2>
                    <p> By: {list.created_by}</p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default ListsPage;
