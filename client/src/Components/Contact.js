import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import "./ContactPage.css"; // Import your custom CSS for styling

const ContactPage = () => {
  return (
    <div className="contact-page" >
      <Container className="py-5">
        <Row>
          <Col lg={6} className="mb-4">
            <div className="contact-form">
              <h2>Contact Us</h2>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>

                <Form.Group controlId="formMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={4} placeholder="Enter your message" />
                </Form.Group>

                <Form.Group controlId="formButton" style={{ marginTop: "10px" }}>
                  <Button variant="primary" type="submit">
                    Send Message
                  </Button>
                </Form.Group>
              </Form>
            </div>
          </Col>
          <Col lg={6}>
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>
                If you have any questions or inquiries, feel free to contact us. We'll be
                happy to assist you.
              </p>
              <div className="contact-details">
                <p>Email: talikotisaqib257@gmail.com</p>
                <p>Phone: +91 8310060176</p>
                <p>Address: Shivbasav Nagar, Belgaum, India</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactPage;
