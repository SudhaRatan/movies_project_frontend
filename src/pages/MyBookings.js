import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../App";
import "./MyBookings.css"
import TicketCard from "../components/ticketCard";

const MyBookings = () => {

  const [tickets, setTickets] = useState('')

  useEffect(() => {
    axios
      .get(`${API}/mybookings`)
      .then(res => {
        setTickets(res.data)
      })
  }, [])

  return (
    <div className="cont">
      <div className="text">My bookings</div>
      <div className="ticketCardCont">
        {
          tickets && tickets.map(ticket => {
            return (
              <TicketCard key={ticket._id} ticket={ticket} />
            )
          })
        }
      </div>
    </div>
  )
}

export default MyBookings