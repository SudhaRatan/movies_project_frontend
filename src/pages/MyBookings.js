import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../App";
import "./MyBookings.css"
import TicketCard from "../components/ticketCard";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loader";

const MyBookings = () => {
  axios.defaults.headers.get['x-access-token'] = localStorage.getItem('token')
  axios.defaults.headers.post['x-access-token'] = localStorage.getItem('token')

  const navigate = useNavigate()
  const [tickets, setTickets] = useState('')

  useEffect(() => {
    axios
      .get(`${API}/mybookings`)
      .then(res => {
        console.log(res.data.result)
        if (res.data.auth) {
          setTickets(res.data.result)
        } else {
          navigate('/login', {
            state: {
              message: "Login to continue"
            }
          })
        }
      })
  }, [])

  return (
    <div className="cont">
      <div className="text">My bookings</div>
      <div className="ticketCardCont">
        {
          tickets ? tickets.map(ticket => {
            return (
              <TicketCard key={ticket._id} ticket={ticket} />
            )
          })
            :
            <Loading />
        }
      </div>
    </div>
  )
}

export default MyBookings