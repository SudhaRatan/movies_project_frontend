import './ticketCard.css'

const InfoCard = ({ movie, seat }) => {

  return (
    <div>
      {/* {console.log(Theatre.name)} */}
      <div className='ticket-cont'>
        <div>
          <img src={movie.image} className="ticketImg" alt="ticket" />
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          justifyContent: "center",
          gap: "20px",
          // alignItems:"center",
        }}>
          <div className='movieName'>
            {movie.name}
          </div>
          <div className='theatreName'>
            Total seats booked: {seat}
          </div>

          <div className='theatreName'>
            Remaining seats: {movie.theatres.length*50 - seat}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoCard