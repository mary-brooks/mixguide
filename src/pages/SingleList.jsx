import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SingleList() {

  const {listId} = useParams();

  const [singleList, setSingleList] = useState(null)

  const API_URL = `https://cocktail-app-mock-backend.adaptable.app/lists/${listId}`;

  const getSingleList = async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      setSingleList(response.data);
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
{/*       singleList && (
        <div className='single-list'>
          <h2>{singleList.title}</h2>
          <h3>{singleList.created_by}</h3>
        </div>
      ) */}
    </div>
  )
}

export default SingleList