import { useRouter } from 'next/router'
import Axios from 'axios'
import { Container, Image, Alert, Form, Button, Row, Modal, Col } from "react-bootstrap";
import { useState } from 'react'

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertModal, setShowAlertModal] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nameModal, setNameModal] = useState('')
  const [emailModal, setEmailModal] = useState('')
  const [passwordModal, setPasswordModal] = useState('')
  const router = useRouter()


  const nameModalHandleInput = (e) => {
    setNameModal(e.target.value)
  }
  const emailModalHandleInput = (e) => {
    setEmailModal(e.target.value)
  }
  const passwordModalHandleInput = (e) => {
    setPasswordModal(e.target.value)
  }

  const emailHandleInput = (e) => {
    setEmail(e.target.value)
  }
  const passwordHandleInput = (e) => {
    setPassword(e.target.value)
  }

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleCreateSubmit = async (e) => {
    e.preventDefault()
    try {
      await Axios.post('http://localhost:3001/register', {
        name: nameModal.toUpperCase(),
        email: emailModal,
        password: passwordModal
      })
      setShowModal(false);
      setShowAlert(false)
      setShowAlertModal(false)
      setNameModal('')
      setEmailModal('')
      setPasswordModal('')
    }
    catch (error) {
      console.error(error)
      setShowAlertModal(true)
    }
  }

  const handleSubmitLogin = async (e) => {
    e.preventDefault()
    try {
      const result = await Axios.post('http://localhost:3001/login', {
        email,
        password
      })
      localStorage.setItem('token', result.data.token)
      if (email == process.env.ADM_EMAIL && password == process.env.ADM_PASSWORD) {
        router.push('/suport')
      }
      else {
        router.push('/user')
      }
    }
    catch (error) {
      setShowAlert(true)
      console.error(error)
    }
  }

  return (
    <Container>
      <br />
      <Row>
        <Col lg={6}>
          <Image width="100%" src="/undraw.svg" />
        </Col>
        <Col lg={6}>
          <Row className="justify-content-md-center">
            <Col xs lg="8" md="8">
              <br />
              <h1 className="text-center">Ticket Manager</h1>
              <br />
              <Form onSubmit={(e) => handleSubmitLogin(e)}>
                <Form.Control type="email" placeholder="Enter email" onChange={emailHandleInput} />
                <br />
                <Form.Control type="password" placeholder="Password" onChange={passwordHandleInput} />
                <br />
                <Alert show={showAlert} variant="danger">Invalid email or password!!!!</Alert>
                <Button block variant="primary" type="submit">Submit</Button>
                <br />
                <Button variant="link" onClick={handleShow}>Register</Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Form onSubmit={(e) => handleCreateSubmit(e)}>
          <Modal.Header closeButton>
            <Modal.Title>New Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <Form.Control
                  required
                  placeholder="Full name"
                  value={nameModal}
                  onChange={(e) => nameModalHandleInput(e)}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Form.Control
                  required
                  placeholder="Email"
                  type="email"
                  value={emailModal}
                  onChange={(e) => emailModalHandleInput(e)}
                />
              </Col>
              <Col>
                <Form.Control
                  required
                  placeholder="Password"
                  type="password"
                  value={passwordModal}
                  onChange={(e) => passwordModalHandleInput(e)}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Alert show={showAlertModal} variant="danger">Email already exists</Alert>
              </Col>
            </Row>
            <br />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
          </Button>
            <Button variant="primary" type="submit">
              Create
          </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}

export default App;
