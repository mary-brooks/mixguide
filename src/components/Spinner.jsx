import spinner from '../assets/images/loading-gif.gif';
import Navbar from '../components/Navbar';

function Spinner() {
  return (
    <div>
    <Navbar />
    <div className='spinner'>
    <img src={spinner} alt="loading-spinner" />
    </div>
    </div>
  )
}

export default Spinner