import React, { useState, useEffect } from "react";
import Axios from 'axios'
import {
  Container,
  Table,
  Row,
  Col,
  Form,
  Modal,
  Button,
} from "react-bootstrap";

const App = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [inpTitle, setInpTitle] = useState("");

  const handleClose = () => {
    newTicket();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleInputTitle = (event) => {
    setInpTitle(event.target.value);
  };

  const getData = async () => {
    try {
      const token = localStorage.getItem('token')
      const result = await Axios.get('http://localhost:3001/ticket', { headers: { Authorization: `Bearer ${token}` } })
      setData(result.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const newTicket = async () => {
    const token = localStorage.getItem('token')
    if (inpTitle) {
      const date = new Date();
      await Axios.post('http://localhost:3001/ticket', {
        title: inpTitle,
        data: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
        status: "Waiting",
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      getData()
      setInpTitle("");
    }
  };

  return (
    <Container>
      <br />
      <Button variant="primary" onClick={handleShow}>
        New Ticket
      </Button>{' '}
      <Button variant="primary" onClick={() => getData()}>
        Refresh
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Row>
              <Col>
                <Form.Control
                  required
                  onChange={(e) => handleInputTitle(e)}
                  value={inpTitle}
                  placeholder="Title"
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <br />
      <br />
      {data.length ? (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Title</th>
              <th>Data</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{value.id}</td>
                  <td>{value.title}</td>
                  <td>{value.data}</td>
                  <td>{value.status}</td>
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
