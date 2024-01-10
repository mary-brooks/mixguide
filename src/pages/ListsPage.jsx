import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListsPage() {

  const [lists, setLists] = useState([])

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
      <div className='lists-container'>
        {lists &&
          lists.map(list => {
            return (
                <Link key={list.id} to={`/lists/${list.id}`}>
                  <div className='list-card'>
                    <h2>{list.title}</h2>
                  </div>
                </Link>
            );
          })}
      </div>
    </div>
  );
  }

export default ListsPage;
