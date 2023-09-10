import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './EventPlazaNavbar.css'; // Import custom styles

const EventPlazaNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Navbar.Brand as={Link} to="/" className="navbar-brand">
        <strong>EventPlaza</strong>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar" />
      <Navbar.Collapse id="navbar">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/" className="nav-link">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/BrowseEvents" className="nav-link">
            Browse Events
          </Nav.Link>
          <Nav.Link as={Link} to="/hostevents" className="nav-link">
            Host Events
          </Nav.Link>
          <Nav className="ml-auto">
          <Nav.Link as={Link} to="/booking" className="nav-link">
            Booking
          </Nav.Link>
        </Nav>
          <Nav.Link as={Link} to="/contact" className="nav-link">
            Contact
          </Nav.Link>
        </Nav>
       
      </Navbar.Collapse>
    </Navbar>
  );
};

export default EventPlazaNavbar;
