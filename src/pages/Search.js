import Button from 'react-bootstrap/Button';
import './Home.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API } from '../App';
import MovieCard from '../components/MovieCard';
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {

  const [movies, setMovies] = useState(null)
  const [searchParams] = useSearchParams()
  // console.log(searchParams.get('search'))

  const getMovies = () => {
    axios
      .get(`${API}/${searchParams.get('search')}`)
      .then(res => {
        setMovies(res.data)
      })
  }

  useEffect(() => {
    getMovies();
  }, [searchParams.get('search')])

  return (
    <div className='Home'>
      <h3 className='availMovies'>Search results</h3>
      <div className='movieCard-container'>
        {
          movies
            ?
            movies.map(movie => {
              return(
                <MovieCard key={movie._id} movie={movie} />
              )
            })
            : null
        }
      </div>
    </div>
  )
}

export default SearchPage