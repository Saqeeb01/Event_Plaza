import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import './Home.css'; // Import custom styles

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <Container fluid className="home-container p-0">
      <Card className="bg-primary text-white text-center mb-4 home-card">
        <Card.Body>
          <Card.Title>Welcome to Event Plaza</Card.Title>
          <Card.Text>Your go-to platform for discovering and booking exciting events!</Card.Text>
        </Card.Body>
      </Card>

      <Container className="py-5">
        <Row className="feature-row">
          <Col md={6} className="mb-4">
            <h2>Discover Amazing Events</h2>
            <p>
              Explore a wide range of events happening near you. From music concerts to workshops, we have something for everyone.
            </p>
          </Col>
          <Col md={6} className="mb-4">
            <h2>Book Your Tickets</h2>
            <p>
              Purchase event tickets quickly and securely. Just a few clicks and you're ready to enjoy a memorable experience.
            </p>
          </Col>
        </Row>
      </Container>

      <Card className="bg-secondary text-white text-center mb-4 home-card">
        <Card.Body>
          <Card.Title>Join Us Today!</Card.Title>
          <Card.Text>Sign up now to start exploring and booking your favorite events.</Card.Text>
          <Button variant="primary" className="btn-signup" onClick={handleShowModal}>
            Sign Up
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Add your form fields here */}
            <Form.Group controlId="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="Name" placeholder="Enter name" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
           
            {/* Add more form fields as needed */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Home;
