import { Routes, Route } from 'react-router-dom'
import Home from './pages/HomePage'
import Lists from './pages/ListsPage'
import CocktailOfTheDay from './pages/CocktailOfTheDayPage'
import AllCocktails from './pages/AllCocktails'
import SingleCocktail from './pages/SingleCocktail';
import SearchCocktails from './pages/SearchCocktailsPage'
import AddList from './pages/AddListPage';
import SingleList from './pages/SingleList';
import UpdateList from './pages/UpdateListPage';

function App() {
  return (

  <div className='App'>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/searchcocktails" element={<SearchCocktails />} />
      <Route path="/lists" element={<Lists />} />
      <Route path="/lists/:listId" element={<SingleList />} />
      <Route path='/lists/addlist' element={<AddList />} />
      <Route path='/lists/updatelist/:listId' element={<UpdateList />} />
      <Route path="/cocktailoftheday" element={<CocktailOfTheDay />} />
      <Route path="/cocktails/:cocktailId" element={<SingleCocktail />} />
      <Route path='/allcocktails' element={<AllCocktails />}></Route>
    </Routes>

  </div>
)
}

export default App;
