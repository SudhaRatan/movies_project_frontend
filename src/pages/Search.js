import './Home.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API } from '../App';
import MovieCard from '../components/MovieCard';
import { useSearchParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const SearchPage = () => {

  const [movies, setMovies] = useState(null)
  const [searchParams] = useSearchParams()
  const [seats, setSeats] = useState(null)
  // console.log(searchParams.get('search'))

  const getMovies = () => {
    axios
      .get(`${API}/${searchParams.get('search')}`)
      .then(res => {
        setMovies(res.data)
      })
  }

  const getMovieDetails = () => {
    axios
      .get(`${API}/getMovieDetails`)
      .then(res => {
        setSeats(res.data.selectedSeats)
        // console.log(res.data.selectedSeats)
      })
  }

  useEffect(() => {
    getMovies();
    getMovieDetails();
  }, [searchParams.get('search')])

  return (
    <div className='Home'>
      <h3 className='availMovies'>Search results</h3>
      <div className='movieCard-container'>
        {
          movies && seats
            ?
            movies.map(movie => {
              let seatno = seats.filter(seatItem => {
                if (seatItem.id === movie._id) {
                  return (seatItem)
                }
              })
              return (
                <MovieCard key={movie._id} movie={movie} show={true} seat={seatno[0].seatNumbers} />
              )
            })
            : <Spinner />
        }
      </div>
    </div>
  )
}

export default SearchPage