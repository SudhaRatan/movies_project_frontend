import './MovieCard.css'
import { Link } from 'react-router-dom'

const MovieCard = ({ movie,show }) => {
  return (
    <div className='movieCont'>
      <div>
        <img className='movieImg' src={movie.image} alt="movieImage" />
      </div>
      <div className='movieName'>{movie.name}</div>
      {
        show &&
        <Link className='book' to={"/bookmovie"} state={movie}>
          <div style={{ color: '#FFF', textDecoration: 'none' }}>Book now</div>
        </Link>
      }
    </div>
  )
}

export default MovieCard