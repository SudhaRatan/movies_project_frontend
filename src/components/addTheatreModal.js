import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../App';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const AddTheatreModal = ({ show, toggle }) => {
  axios.defaults.headers.get['x-access-token'] = localStorage.getItem('token')
  axios.defaults.headers.post['x-access-token'] = localStorage.getItem('token')

  const [theatreName, setTheatreName] = useState('')
  const [show1, setShow1] = useState(false)
  const [message, setMessage] = useState('')

  const addTheatre = () => {
    if (theatreName) {
      axios
        .post(`${API}/addtheatre`, {
          name: theatreName
        })
        .then(res => {
          if (res.data.auth) {
            setTheatreName('')
            setMessage(res.data.message)
            setShow1(true)
            toggle()
          } else {
            console.log(res.data)
            setMessage(res.data.message)
            setShow1(true)
          }
        })
    } else {
      setMessage('Enter theatre name')
      setShow1(true)
    }
  }

  return (
    <>

      <ToastContainer className="p-3" position='top-center'>
        <Toast closeButton={false} onClose={() => setShow1(false)} show={show1} delay={1500} autohide>
          <Toast.Header>
            <strong className="me-auto">Movie Booking</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title>Add a theatre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Theatre name</Form.Label>
            <Form.Control value={theatreName} onChange={(e) => {
              setTheatreName(e.target.value)
            }} type="text" placeholder="Enter theatre name" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggle}>
            Close
          </Button>
          <Button variant="primary" onClick={addTheatre}>
            Add theatre
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddTheatreModal