import React, { useState, useEffect } from "react";
import { Table, Button, Container, Row, Col, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editedEvent, setEditedEvent] = useState({
    eventName: "",
    eventDate: "",
    eventLocation: "",
    eventDescription: "",
  });

  const location = useLocation();

  useEffect(() => {
    axios
    .get("https://event-plaza.onrender.com/events")
    .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  useEffect(() => {
    if (location.state && location.state.newEvent) {
      const newEvent = location.state.newEvent;
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
  }, [location.state]);

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await axios.delete(
        `https://event-plaza.onrender.com/delete-event/${eventId}`
      );

      if (response.status === 200) {
        alert("Event deleted successfully!");
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== eventId)
        );
      } else {
        alert("Failed to delete event. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleEditEvent = (event) => {
    setShowEditModal(true);
    setEditingEvent(event);
    setEditedEvent({
      eventName: event.eventName,
      eventDate: event.eventDate,
      eventLocation: event.eventLocation,
      eventDescription: event.eventDescription,
    });
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(
        `https://event-plaza.onrender.com/update-event/${editingEvent.id}`,
        editedEvent
      );

      if (response.status === 200) {
        alert("Event updated successfully!");
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === editingEvent.id ? editedEvent : event
          )
        );
        setShowEditModal(false);

        // Reset the editedEvent state after successful save
        setEditedEvent({
          eventName: "",
          eventDate: "",
          eventLocation: "",
          eventDescription: "",
        });
      } else {
        alert("Failed to update event. Please try again.");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <Container className="mt-5" style={{ marginBottom: "40px" }}>
      <h2 className="text-center mb-4">Manage Events</h2>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Location</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.eventName}</td>
                  <td>{event.eventDate}</td>
                  <td>{event.eventLocation}</td>
                  <td>{event.eventDescription}</td>
                  <td>
                    <Button variant="info" onClick={() => handleEditEvent(event)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteEvent(event.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="eventName">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                value={editedEvent.eventName}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent, eventName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="eventDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={editedEvent.eventDate}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent, eventDate: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="eventLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={editedEvent.eventLocation}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent, eventLocation: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="eventDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editedEvent.eventDescription}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent, eventDescription: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageEvents;
