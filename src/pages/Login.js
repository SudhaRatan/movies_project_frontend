import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../App';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation} from 'react-router-dom';

const LoginPage = () => {

  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const [message, setMessage] = useState()

  const login = () => {
    axios
      .post(`${API}/login`, { id, password })
      .then(async (res) => {
        if (res.data.auth) {
          localStorage.setItem('name', res.data.user)
          localStorage.setItem('token', res.data.token)
          navigate('/')
        } else {
          setMessage(res.data)
        }
      })
  }

  useEffect(() => {
    if(location.state) setMessage(location.state.message)
  },[])

  return (
    <div className='main'>
      <h2 style={{ textAlign: "center" }}>Login</h2>
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
        <div style={{
          display: "flex",
          justifyContent: 'space-between'
        }}>
          <Link to={"/signup"} className='signup'>New user? Signup</Link>
          <Link to={"/adminlogin"} className='signup'>Admin login</Link>
        </div>
      </div>

    </div>
  )
}

export default LoginPage