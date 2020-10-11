import React, { useState, useEffect } from "react";
import Axios from 'axios'

import { Container, Table, Button, Modal } from "react-bootstrap";

const App = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false)
  const [index, setIndex] = useState(0)
  const [message, setMessage] = useState('')
  const [newStatus, setNewStatus] = useState('')

  const getData = async () => {
    try {
      const token = localStorage.getItem('token')
      const result = await Axios.get('http://localhost:3001/ticket', { headers: { Authorization: `Bearer ${token}` } })
      setData(result.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleClose = () => setShow(false)

  const handleShow = (id) => {
    const { status } = data[id]
    if (status !== "Solved") {
      if (status === "Waiting") {
        setNewStatus("Solving")
        setMessage("You want to solve this problem?")
      }
      else {
        setNewStatus("Solved")
        setMessage("Do you want to end this problem?")
      }
      setIndex(id + 1)
      setShow(true)
    }
  }

  const buttonModalHandle = async () => {
    try {
      const token = localStorage.getItem('token')
      await Axios.put('http://localhost:3001/ticket', {
        id: index,
        newStatus
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      getData()
      setShow(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={buttonModalHandle}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <br />
      <Button variant="primary" onClick={() => getData()}>
        Refresh
      </Button>
      <br />
      <br />
      {data.length ? (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Title</th>
              <th>Client</th>
              <th>Data</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, id) => {
              return (
                <tr key={id}>
                  <td>{value.id}</td>
                  <td>{value.title}</td>
                  <td>{value.client}</td>
                  <td>{value.data}</td>
                  <td>{value.status}</td>
                  <td>
                    <Button onClick={() => handleShow(id)}>
                      Start
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
          <h1 className="text-center">Empty</h1>
        )}
    </Container>
  );
};

export default App;
