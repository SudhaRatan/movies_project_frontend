import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../App";
import "./MyBookings.css"
import TicketCard from "../components/ticketCard";

const AdminDashboard = () => {

  const [tickets, setTickets] = useState('')
  const [movies,setMovies] = useState(null)
  const [seats,setSeats] = useState(null)

  useEffect(() => {
    axios
      .get(`${API}/dashboard`)
      .then(res => {
        setMovies(res.data.movies)
        setSeats(res.data.selectedSeats)
      })
  }, [])

  return (
    <div >
      <div className="text">DashBoard</div>
      <div className="ticketCardCont">
        {
          movies && seats &&
          movies.map((movie,index) => {
            return(
              <div>
                <div>{movie.name}</div>
                <div>Booked seats: {seats[index]}</div>
                <div>Available seats: {50 - seats[index]}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default AdminDashboard