import './MovieCard.css'
import { Link } from 'react-router-dom'

const MovieCard = ({ movie, show, seat }) => {
  console.log(seat)
  return (
    <div className='movieCont'>
      <div style={{ position: 'relative' }}>
        <div style={{
          position: "absolute",
          zIndex: 10,
          backgroundColor: '#efefef',
          right: 0,
          margin: 10,
          padding: "1px 8px",
          borderRadius: 40,
          textAlign: 'center',
          fontSize: "1rem",
          opacity: 0.9,
          fontWeight: 600
        }}>{seat < 30 ? "Available" : seat <=40 ?  "Book ASAP" : "Sold out"}</div>
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