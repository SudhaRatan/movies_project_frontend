import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import Select from "react-select";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../App';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const AddMovieModal = ({ show, toggle }) => {
  axios.defaults.headers.get['x-access-token'] = localStorage.getItem('token')
  axios.defaults.headers.post['x-access-token'] = localStorage.getItem('token')

  const [theatres, setTheatres] = useState(null)

  const [movieName, setMovieName] = useState('')
  const [selectedTheatres, setSelectedTheatres] = useState(null)
  const [image, setImage] = useState(null)

  const [show1, setShow1] = useState(false)
  const [message, setMessage] = useState('')

  const addMovie = () => {
    if (movieName && selectedTheatres && image) {
      axios.post(`${API}/addmovie`, {
        name: movieName,
        theatres: selectedTheatres,
        image
      })
        .then(res => {
          if (res.data.auth) {
            handleClose()
          } else {
            setMessage('Movie already exists')
            setShow1(!show1)
          }
        })
    } else {
      setMessage('Fill all details')
      setShow1(!show1)
    }
  }

  const handleClose = () => {
    setMovieName('')
    setSelectedTheatres(null)
    setImage(null)
    toggle()
  }

  const imageUploadHandler = (e) => {
    const img = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result.toString())
    }
    reader.readAsDataURL(img)
  }

  const fetchTheatres = () => {
    axios
      .get(`${API}/gettheatres`)
      .then(res => {
        let tempTheatres = []
        res.data.map((theatre) => {
          theatre.value = theatre.name
          theatre.label = theatre.name
          tempTheatres.push(theatre)
        })
        setTheatres(tempTheatres)
      })
  }

  useEffect(() => {
    fetchTheatres()
  })

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
        show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Movie name</Form.Label>
            <Form.Control type="text" placeholder="Enter movie name" value={movieName} onChange={(e) => { setMovieName(e.target.value) }} />
          </Form.Group>
          <br />
          <Select
            isMulti
            name="theatres"
            options={theatres}
            onChange={(val) => {
              setSelectedTheatres(val)
              console.log(val)
            }}
            className="basic-multi-select"
            classNamePrefix="Select theatres"
            closeMenuOnSelect={false}
          />
          <br />
          <label style={{ width: "100%" }}>

            <input style={{ display: "none" }} type='file' onChange={imageUploadHandler} />
            <div style={{
              color: "#fff",
              padding: 5,
              border: "1px solid grey",
              width: "100%",
              borderRadius: "3px",
              backgroundColor: 'grey',
              // textAlign:"center"
            }}>
              Upload Image
            </div>
          </label>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addMovie}>
            Add Movie
          </Button>
          {
            image && <img style={{ width: "100%" }} src={image} alt="Poster" />
          }
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddMovieModal