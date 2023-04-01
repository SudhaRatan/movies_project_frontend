import { Button } from "react-bootstrap";
import { createSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../App";
import Im from './menu.png'
import { useNavigate } from "react-router-dom";

function DefNavbar() {
  axios.defaults.headers.get['x-access-token'] = localStorage.getItem('token')

  const [toggle, setToggle] = useState(false)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    if (search !== "") {
      navigate({
        pathname: '/search',
        search: createSearchParams({
          search
        }).toString()
      })
    }
  }

  return (
    <div style={{
      display: "flex",
      backgroundColor: '#202124',
      alignItems: "center",
      position: 'fixed',
      top: 0,
      zIndex: 10,
      width: '100%'
    }}>
      <Link to={"/"}
        style={{
          display: "inline",
          fontSize: "1.5em",
          paddingLeft: "20px",
          color: '#fefefe',
          textDecoration: "none"
        }}
      >Movie Booking</Link>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        style={{
          flex: 1,
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px",
          margin: "10px 0px 10px 30px",
          outline: "0px",
          border: "1px",
          height: "30px",
          padding: "18px",
        }}
        placeholder="Search a movie"
      />
      <button onClick={handleSearch} style={{
        height: "39px",
        width: "80px",
        marginRight: "10px",
        backgroundColor: "#fefefe",
        color: '#202124',
        borderTopRightRadius: "10px",
        borderBottomRightRadius: "10px"
      }} >Search</button>
      <div style={{
        color: '#fefe',
        fontSize: 24,
        padding: "0px 20px",
        cursor: "pointer",
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
      }} onClick={() => {
        setToggle(!toggle)
      }}><img src={Im} width={30} style={{
        backgroundColor: '#123654'
      }} /></div>
      {
        toggle
          ?
          <div style={{
            position: 'absolute',
            // margin:40,
            top: 50,
            right: 0,
            backgroundColor: '#202124',
            padding: 10,
            zIndex:999
          }}>
            {
              localStorage.getItem('token')
                ?
                <div style={{
                  color: '#fefefe',
                  fontSize: "1rem",
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 20,
                }}>Hi {localStorage.getItem('name')}
                  {
                    localStorage.getItem('name') == "Admin" &&
                    <div onClick={() => {
                      setToggle(!toggle)
                      navigate('/dashboard')
                    }}>
                      <Button style={{
                        backgroundColor: '#576CBC',
                        borderWidth: 0,
                        width: 200
                      }}>Admin DashBoard</Button>
                    </div>
                    
                  }
                  {
                    localStorage.getItem('name') != "Admin" &&
                    <div onClick={() => {
                      setToggle(!toggle)
                      navigate('/mybookings')
                    }}>
                      <Button style={{
                        backgroundColor: '#576CBC',
                        borderWidth: 0,
                        width: 200
                      }}>My bookings</Button>
                    </div>
                    
                  }

                  <div onClick={() => {
                    setToggle(!toggle)
                    localStorage.removeItem('token')
                    navigate('/')
                  }}>
                    <Button style={{
                      backgroundColor: '#576CBC',
                      borderWidth: 0,
                      width: 200
                    }}>Logout</Button>
                  </div>
                </div>
                :
                <div onClick={() => setToggle(!toggle)}>
                  <Link to={"/login"}>
                    <Button style={{
                      backgroundColor: '#576CBC',
                      borderWidth: 0,
                      marginRight: 20
                    }}>Login</Button>
                  </Link>
                </div>
            }
          </div>

          : null
      }
    </div>
  );
}

export default DefNavbar;