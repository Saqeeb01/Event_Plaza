import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./EventPlazaFooter.css"; // Import your custom footer styles
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const EventPlazaFooter = () => {
  return (
    <footer className="event-plaza-footer">
      <Container>
        <Row>
          <Col lg={4} md={6} className="mb-4">
            <h5>About Us</h5>
            <p>
              EventPlaza is your one-stop platform for discovering and hosting
              events. We aim to provide the best event experiences for everyone.
            </p>
          </Col>
          <Col lg={4} md={6} className="mb-4">
            <h5>Contact Us</h5>
            <p>Email: talikotisaqib257@gmail.com</p>
            <p>Phone: +91 8310060176</p>
            <p>Address: Shivbasav Nagar, Belgaum, India</p>
          </Col>
          <Col lg={4} md={12}>
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com/Saqeeb_01" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="text-center py-3">
        © {new Date().getFullYear()} EventPlaza. All rights reserved.
      </div>
    </footer>
  );
};

export default EventPlazaFooter;
