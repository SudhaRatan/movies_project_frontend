import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css';
import { useState } from 'react';
import axios from 'axios';
import { API } from '../App';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {

  const [password, setPassword] = useState('')
  const [post, setPost] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    LoginId: "",
    Password: "",
    PhoneNumber: "",
  })
  const [message, setMessage] = useState(false)
  const navigate = useNavigate()

  const login = () => {
    setMessage(false)
    axios
      .post(`${API}/login/signup`, post)
      .then(async (res) => {
        if (res.data.auth) {
          navigate('/login')
        } else {
          setMessage(res.data.message)
        }
      })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  return (
    <div className='main'>
      <h2 style={{ textAlign: "center" }}>Signup</h2>
      <div className='loginCont'>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          {
            message &&
            <div style={{color:"red"}}>{message}</div>
          }
          <Form.Label>First name</Form.Label>
          <Form.Control
            value={post.FirstName}
            onChange={handleChange}
            name="FirstName"
            type="text" placeholder="Enter first name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            value={post.LastName}
            onChange={handleChange}
            name="LastName"
            type="text" placeholder="Enter last name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control value={post.Email} onChange={handleChange} name="Email" type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Login Id</Form.Label>
          <Form.Control value={post.LoginId} onChange={handleChange} name="LoginId" type="text" placeholder="Enter login id" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control value={post.Password} onChange={handleChange} name="Password" type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Confirm password</Form.Label>
          {
            password !== post.Password &&
            <br />
          }
          <Form.Label>{
            password !== post.Password &&
            <>
              <div style={{ color: "red" }} >Enter same password</div>
            </>
          }</Form.Label>
          <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter login id" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Phone number</Form.Label>
          <Form.Control value={post.PhoneNumber} name='PhoneNumber' onChange={handleChange} type="number" placeholder="Enter phone number" />
        </Form.Group>

        <Button onClick={login} variant="primary">
          Signup
        </Button>
        <Link to={"/login"} className='signup'>Existing user? Login</Link>
      </div>
    </div>
  )
}

export default SignupPage