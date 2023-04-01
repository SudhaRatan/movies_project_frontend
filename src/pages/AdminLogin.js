import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../App';
import { useNavigate, useLocation } from 'react-router-dom';


const AdminLoginPage = () => {

  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState()
  const navigate = useNavigate()
  const location = useLocation()

  const login = () => {
    axios
      .post(`${API}/login/admin`, { id, password })
      .then(async (res) => {
        // console.log(res)
        if (res.data.auth) {
          localStorage.setItem('name', "Admin")
          localStorage.setItem('token', res.data.token)
          navigate('/dashboard')
        } else {
          setMessage(res.data.message)
        }
      })
  }


  useEffect(() => {
    if(location.state) setMessage(location.state.message)
  },[])

  return (
    <div className='main'>
      <h2 style={{ textAlign: "center" }}>Admin Login</h2>
      <div className='loginCont'>
        {
          message &&
          <div style={{ color: "red" }}>
            {message}
          </div>
        }
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Login Id</Form.Label>
          <Form.Control value={id} onChange={(e) => setId(e.target.value)} type="email" placeholder="Enter login id" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        </Form.Group>
        <Button onClick={login} variant="primary">
          Login
        </Button>
        {/* <Link to={"/signup"} className='signup'>New user? Signup</Link> */}
      </div>
    </div>
  )
}

export default AdminLoginPage