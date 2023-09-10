import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import shortid from "shortid";
import QRCode from "qrcode.react"; // Import QRCode component
import "./BrowseEvents.css"; // Import custom styles


const BrowseEvents = (props) => {
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    quantity: 1,
  });

  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const handleOpenEventModal = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleCloseEventModal = () => {
    setShowEventModal(false);
  };

  const handlePurchaseTicket = async (event) => {
    if (!event) {
      console.error("No event selected");
      return;
    }
    setSelectedEvent(event);
    setShowPurchaseForm(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    if (!selectedEvent) {
      console.error("No event selected");
      return;
    }
  
    const { name, email, quantity } = formData;
  
    if (!name || !email || !quantity) {
      console.error("Please fill in all fields");
      return;
    }
  
    try {
      const bookingId = shortid.generate().slice(0, 6);
  
      const purchaseResponse = await axios.post(
        "http://localhost:5000/purchase-ticket",
        {
          eventName: selectedEvent.eventName,
          location: selectedEvent.eventLocation,
          date: selectedEvent.eventDate,
          eventDescription: selectedEvent.eventDescription, // Include event description
          ticketPrice: selectedEvent.ticketPrice,           // Include ticket price
          name,
          email,
          quantity,
          bookingId,
        }
      );
  
      if (purchaseResponse.status === 200) {
        setShowPurchaseForm(false);
  
        const ticketSaleResponse = await axios.post(
          "http://localhost:5000/ticket-sales",
          {
            eventName: selectedEvent.eventName,
            name,
            email,
            quantity,
            ticketPrice: selectedEvent.ticketPrice,
          }
        );
  
        if (ticketSaleResponse.status === 200) {
          const ticketData = {
            bookingId,
            eventName: selectedEvent.eventName,
            eventDate: selectedEvent.eventDate,
            eventLocation: selectedEvent.eventLocation,

            name,
            email,
            quantity,
            eventDescription: selectedEvent.eventDescription, // Include event description
            ticketPrice: selectedEvent.ticketPrice,           // Include ticket price
            totalPrice: selectedEvent.ticketPrice * quantity,
          };
  
          if (props.onTicketPurchase) {
            props.onTicketPurchase(ticketData);
          }
  
          alert("Ticket purchased successfully!");
          console.log("Ticket purchased:", ticketData);
        }
      }
    } catch (error) {
      console.error("Error purchasing ticket:", error);
    }
  };
  
  
  
  
  
  
  
  
  

  // const fetchBookingDetails = async (bookingId) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5000/checkin/${bookingId}`
  //     );
  //     setBookingDetails(response.data);
  //   } catch (error) {
  //     console.error("Error fetching booking details:", error);
  //   }
  // };

 
  return (
    <Container className="browse-events-container mt-5">
      <h2 className="section-title">Discover Exciting Events</h2>
      <Row xs={1} md={2} lg={3}>
        {events.map((event) => (
          <Col key={event.id} className="mb-4">
            <Card className="event-card">
              <Card.Body>
                <Card.Title>{event.eventName}</Card.Title>
                <Card.Text>Date: {event.eventDate}</Card.Text>
                <Card.Text>Location: {event.eventLocation}</Card.Text>
                <div className="button-container">
                  <Button
                    onClick={() => handleOpenEventModal(event)}
                    variant="primary"
                    className="btn-learn-more"
                  >
                    Learn More
                  </Button>
                  <Button
                    onClick={() => handlePurchaseTicket(event)}
                    variant="success"
                    className="btn-purchase"
                  >
                    Purchase Ticket
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>  
      <Modal show={showEventModal} onHide={handleCloseEventModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedEvent && selectedEvent.eventName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {selectedEvent && (
            <>
              <div className="event-details">
                <p className="event-date">Date: {selectedEvent.eventDate}</p>
                <p className="event-location">
                  Location: {selectedEvent.eventLocation}
                </p>
                <p className="event-description">
                  Description: {selectedEvent.eventDescription}
                </p>
                <p className="event-type">Event Type: {selectedEvent.eventType}</p>
                <p className="event-price">
                  Ticket Price: ${selectedEvent.ticketPrice}
                </p>
                <p className="event-capacity">
                  Capacity: {selectedEvent.eventCapacity}
                </p>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEventModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showPurchaseForm}
        onHide={() => setShowPurchaseForm(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Purchase Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
              />
            </Form.Group>
            <div className="purchase-button-container">
            <Button type="submit" variant="success">
              Purchase
            </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowPurchaseForm(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {bookingDetails && (
        <Modal show={true} onHide={() => setBookingDetails(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Your QR Code</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Booking ID: {bookingDetails.bookingId}</p>
            <QRCode
              value={bookingDetails.qrCodeDataUrl}
              size={256}
              level={"H"}
              renderAs="svg"
            />
            <div>
              <p>Name: {bookingDetails.name}</p>
              <p>Email: {bookingDetails.email}</p>
              <p>Quantity: {bookingDetails.quantity}</p>
              <p>Event: {bookingDetails.eventName}</p>
              <p>Location: {bookingDetails.eventLocation}</p>
              <p>Capacity: {bookingDetails.eventCapacity}</p>
              <p>Date: {bookingDetails.eventDate}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setBookingDetails(null)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default BrowseEvents;
