import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../App";
import "./MyBookings.css"
import TicketCard from "../components/ticketCard";
import InfoCard from "../components/infoCard";

const AdminDashboard = () => {

  const [tickets, setTickets] = useState('')
  const [movies, setMovies] = useState(null)
  const [seats, setSeats] = useState(null)

  useEffect(() => {
    axios
      .get(`${API}/dashboard`)
      .then(res => {
        setMovies(res.data.movies)
        setSeats(res.data.selectedSeats)
      })
  }, [])

  return (
    <div className="cont" >
      <div className="text">DashBoard</div>
      <div className="ticketCardCont">
        {
          movies && seats &&
          movies.map((movie, index) => {
            let seatno = seats.filter(seatItem => {
              if (seatItem.id == movie._id) {
                return (seatItem)
              }
            })
            console.log(seatno)
            return (
              <InfoCard key={movie._id} movie={movie} seat={seatno[0].seatNumbers} />
            )
          })
        }
      </div>
    </div>
  )
}

export default AdminDashboard