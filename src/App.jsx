import { Routes, Route } from 'react-router-dom'
import Home from './pages/HomePage'
import Favourites from './pages/FavouritesPage'
import CocktailOfTheDay from './pages/CocktailOfTheDayPage'
import SingleCocktail from './pages/SingleCocktail';
import AddCocktail from './pages/AddCocktailPage'
import SearchCocktails from './pages/SearchCocktailsPage'

function App() {
  return (

  <div className='App'>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cocktails" element={<SearchCocktails />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/cocktailoftheday" element={<CocktailOfTheDay />} />
      <Route path="/cocktails/:cocktailId" element={<SingleCocktail />} />
      <Route path="/addcocktail" element={<AddCocktail />} />
    </Routes>
    
  </div>
)
}

export default App;
