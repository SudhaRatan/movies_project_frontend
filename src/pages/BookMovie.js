import axios from "axios"
import { API } from "../App"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import "./Home.css"
import MovieCard from "../components/MovieCard"
import { useLocation } from "react-router-dom"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Button } from "react-bootstrap"


const BookMovie = () => {
  axios.defaults.headers.get['x-access-token'] = localStorage.getItem('token')
  axios.defaults.headers.post['x-access-token'] = localStorage.getItem('token')

  const navigate = useNavigate()
  const location = useLocation()
  const [theatres, setTheatres] = useState(location.state.theatres)

  const [message, setMessage] = useState(null)
  const [sel, setSel] = useState(0)
  const seats = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
    // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  ]

  const [no, setNo] = useState(1)
  const [date, setDate] = useState("")
  const [theatre, setTheatre] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])


  const insertSeat = (num) => {
    setSelectedSeats(prev => {
      return ([
        ...prev,
        num
      ])
    })

  }

  const postTicket = () => {
    axios
      .post(`${API}/bookTicket`, {
        Movie: location.state._id,
        Theatre: theatre,
        date,
        seats: no,
        selectedSeats
      })
      .then(res => {
        if(res.data.auth){
          alert('Ticket booked')
          navigate('/')
        }else{
          setMessage("Fill all details")
        }
      })
  }

  const removeSeat = (num) => {
    let temp = []
    selectedSeats.filter(item => {
      if (item !== num) {
        temp.push(item)
      }
      setSelectedSeats(temp)
    })
  }

  const verify = () => {
    if (localStorage.getItem('token')) {
    } else {
      navigate('/login', {
        state: {
          message: "Login to continue"
        }
      })
    }
  }

  const checkSeats = (check) => {
    var selTemp
    if (check) {
      selTemp = sel - 1
      setSel(sel - 1)
    } else {
      selTemp = sel + 1
      setSel(sel + 1)
    }
    if (no != selTemp) {
      setMessage("Wrong no. of seats selected")
    } else {
      setMessage(null)
    }
  }

  useEffect(() => {
    verify()
  }, [])

  return (
    <div>
      <div className="Home123">
        <div style={{
          // flex: 1,
        }}>
          <MovieCard movie={location.state} />
        </div>
        <div style={{
          flex: 1
        }}>
          <div className="bookMovie">
            <h3 style={{
              textAlign: "left",
              margin: "20px 10px",
            }}>Book tickets for {location.state.name}</h3>
            <div className="bookform">
              {
                message &&
                <div style={{ color: "red" }}>{message}</div>
              }
              <div style={{ fontSize: "1rem" }}>Select a theatre</div>
              <select className="selectTheatre"
                onChange={(e) => {
                  console.log(e.target.value)
                  setTheatre(e.target.value)
                }}>
                <option disabled selected value={null}>Select a theatre</option>
                {
                  theatres.map(theatre => {
                    return (
                      <option key={theatre._id} value={theatre._id} className="selectTheatre">{theatre.name}</option>
                    )
                  })
                }
              </select>
              <div style={{ margin: "15px 0px" }}>
                <div>Select a date</div>
                <input className="selectTheatre1" value={date} type="date" onChange={e => {
                  setDate(e.target.value)
                  if (new Date().getDate() > new Date(e.target.value).getDate()) {
                    setMessage("Select an appropriate date")
                  } else {
                    setMessage(null)
                  }
                }} />
              </div>
              <div style={{ margin: "20px 0px", width: "100%" }}>
                <div>Select no of seats</div>
                <input type='number' className="selectTheatre1" value={no} onChange={(event) => {
                  setNo(event.target.value)
                }} placeholder="Enter seats" />
              </div>
              <div>Select seats</div>
              {
                seats.map((row, index) => {
                  return (
                    <div key={index} style={{
                      display: 'block'
                    }}>
                      {
                        row.map((column, index) => {
                          return (
                            <Seat key={index}
                              checkSeats={checkSeats}
                              item={column}
                              insertSeat={insertSeat}
                              removeSeat={removeSeat}
                            />
                          )
                        })
                      }
                      <br />
                    </div>
                  )
                })
              }
              <Button onClick={postTicket} style={{ width: "100%" }} variant="outline-dark" >Book tickets</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Seat = ({ checkSeats, item, insertSeat, removeSeat }) => {
  const [check, setCheck] = useState(false)
  return (
    <div onClick={() => {
      if (check) {
        removeSeat(item)
      }
      else {
        insertSeat(item)
      }
      checkSeats(check)
      setCheck(!check)

    }}
      style={{
        display: 'inline-block',
        backgroundColor: check ? 'orange' : '#efeffe',
        width: 31,
        height: 31,
        margin: 2,
        color: check ? '#efefef' : '#000',
        cursor: "pointer"
      }} >{item}</div>
  )
}

export default BookMovie