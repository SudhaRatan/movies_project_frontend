import './ticketCard.css'

const TicketCard = ({ ticket }) => {
  console.log(ticket)

  return (
    <div>
      {/* {console.log(Theatre.name)} */}
      <div className='ticket-cont'>
        <div>
          <img src={ticket.Movie.image} className="ticketImg" alt="ticket" />
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
            {ticket.Movie.name}
          </div>
          <div className='theatreName'>
            {ticket.Theatre.name}
          </div>
          <div className='theatreName'>Seat:&nbsp;
            {ticket.selectedSeats.map(seatno => {
              return <span className='qwe'>{seatno}</span>
            })}
          </div>
          <div className='theatreName'>
            {new Date(ticket.date).toDateString()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketCard