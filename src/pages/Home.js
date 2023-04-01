import Button from 'react-bootstrap/Button';
import './Home.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API } from '../App';
import MovieCard from '../components/MovieCard';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  
  const [seats, setSeats] = useState(null)
  const [movies, setMovies] = useState(null)
  const navigate = useNavigate()

  const getMovies = () => {
    axios
      .get(`${API}`)
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
  }, [])

  return (
    <div className='Home'>
      <h3 className='availMovies'>Available Movies</h3>
      <div className='movieCard-container'>
        {
          movies && seats
            ?
            movies.map(movie => {
              let seatno = seats.filter(seatItem => {
                if (seatItem.id == movie._id) {
                  return (seatItem)
                }
              })
              return (
                <MovieCard key={movie._id} movie={movie} show={true} seat={seatno[0].seatNumbers} />
              )
            })
            : null
        }
      </div>
    </div>
  )
}

export default Home