import Button from 'react-bootstrap/Button';
import './Home.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API } from '../App';
import MovieCard from '../components/MovieCard';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [movies, setMovies] = useState(null)
  const navigate = useNavigate()

  const getMovies = () => {
    axios
      .get(`${API}`)
      .then(res => {
        setMovies(res.data)
      })
  }

  useEffect(() => {
    getMovies();
  }, [])

  return (
    <div className='Home'>
      {/* {
        localStorage.getItem('token') && localStorage.getItem('name') === "Admin"
        &&
        <div>
          <h3 className='availMovies'>Admin options</h3>
          <div className='admin-cont'>
            <div className='add' onClick={() => navigate('/addmovie')}>Add a movie</div>
            <div className='add'>Add a theatre</div>
          </div>
        </div>
      } */}
      <h3 className='availMovies'>Available Movies</h3>
      <div className='movieCard-container'>
        {
          movies
            ?
            movies.map(movie => {
              return (
                <MovieCard key={movie._id} movie={movie} show={true} />
              )
            })
            : null
        }
      </div>
    </div>
  )
}

export default Home