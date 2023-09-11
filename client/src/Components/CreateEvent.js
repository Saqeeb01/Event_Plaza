import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventType, setEventType] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [eventCapacity, setEventCapacity] = useState("");

  const isFormValid = () => {
    return (
      eventName &&
      eventDate &&
      eventLocation &&
      eventDescription &&
      eventType &&
      ticketPrice &&
      eventCapacity
    );
  };

  const handleCreateEvent = async () => {
    if (
      !eventName ||
      !eventDate ||
      !eventLocation ||
      !eventDescription ||
      !eventType ||
      !ticketPrice ||
      !eventCapacity
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("https://event-plaza.onrender.com/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventName,
          eventDate,
          eventLocation,
          eventDescription,
          eventType,
          ticketPrice,
          eventCapacity,
        }),
      });

      if (response.ok) {
        // Reset form fields
        setEventName("");
        setEventDate("");
        setEventLocation("");
        setEventDescription("");
        setEventType("");
        setTicketPrice("");
        setEventCapacity("");
        alert("Event created successfully!");
      } else {
        alert("Failed to create event. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <Container style={{ marginBottom: "40px" }}>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={8} lg={6}>
          <div className="create-event-form">
            <h1>Create Event</h1>
            <Form>
              <Form.Group controlId="eventName">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter event name"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="eventDate">
                <Form.Label>Event Date</Form.Label>
                <Form.Control
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="eventLocation">
                <Form.Label>Event Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter event location"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="eventDescription">
                <Form.Label>Event Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Enter event description"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="eventType">
                <Form.Label>Event Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter event type"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="ticketPrice">
                <Form.Label>Ticket Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter ticket price"
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="eventCapacity">
                <Form.Label>Event Capacity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter event capacity"
                  value={eventCapacity}
                  onChange={(e) => setEventCapacity(e.target.value)}
                />
              </Form.Group>

              <div className=" mt-2">
                <Button 
                variant="primary" 
                onClick={handleCreateEvent}
                disabled={!isFormValid()}
                >
                  Create Event
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateEvent;
