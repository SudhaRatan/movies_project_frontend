import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Select from "react-select";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../App';

const AddMovieModal = ({ show, toggle }) => {
  axios.defaults.headers.get['x-access-token'] = localStorage.getItem('token')
  axios.defaults.headers.post['x-access-token'] = localStorage.getItem('token')

  const fetchTheatres = () => {
    axios
      .get(`${API}/gettheatres`)
      .then(res => {
        console.log(res.data)
      })
  }

  useEffect(() => {
    fetchTheatres()
  })

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show} onHide={toggle}>
      <Modal.Header closeButton>
        <Modal.Title>Add a movie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Movie name</Form.Label>
          <Form.Control type="text" placeholder="Enter movie name" />
        </Form.Group>
        <br />
        <Select
          isMulti
          name="theatres"
          options={[
            { value: 'orange', label: 'Orange', color: '#FF8B00' },
            { value: 'yellow', label: 'Yellow', color: '#FFC400' },
            { value: 'green', label: 'Green', color: '#36B37E' },
          ]}
          className="basic-multi-select"
          classNamePrefix="Select theatres"
          closeMenuOnSelect={false}
        />

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggle}>
          Close
        </Button>
        <Button variant="primary" onClick={toggle}>
          Add theatre
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddMovieModal