import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../App";
import "./MyBookings.css"
import InfoCard from "../components/infoCard";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddTheatreModal from "../components/addTheatreModal";
import AddMovieModal from "../components/addMovieModal";

const AdminDashboard = () => {
  axios.defaults.headers.get['x-access-token'] = localStorage.getItem('token')
  axios.defaults.headers.post['x-access-token'] = localStorage.getItem('token')


  const [tickets, setTickets] = useState('')
  const [movies, setMovies] = useState(null)
  const [seats, setSeats] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${API}/dashboard`)
      .then(res => {
        if (res.data.auth) {
          setMovies(res.data.movies)
          setSeats(res.data.selectedSeats)
        }
        else {
          navigate('/adminlogin', {
            state: {
              message: "Login as admin to continue"
            }
          })
        }
      })
  }, [])

  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const toggle = () => {
    setShow(!show)
  }
  const toggle1 = () => {
    setShow1(!show1)
  }

  return (
    <div className="cont" >
      <div className="text">DashBoard</div>
      <AddTheatreModal show={show} toggle={toggle} />
      <AddMovieModal show={show1} toggle={toggle1} />
      <div>
        {/* <h3 className='availMovies'>Admin options</h3> */}
        <div className='admin-cont'>
          <div className='add' onClick={toggle1} >Add a movie</div>
          <div className='add' onClick={toggle}>Add a theatre</div>
        </div>
      </div>
      <div className="ticketCardCont">
        {
          movies && seats &&
          movies.map((movie, index) => {
            let seatno = seats.filter(seatItem => {
              if (seatItem.id == movie._id) {
                return (seatItem)
              }
            })
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