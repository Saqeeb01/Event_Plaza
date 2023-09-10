import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button } from "react-bootstrap";

const Booking = () => {
  const [purchasedEvents, setPurchasedEvents] = useState([]);
  const [eventCompleted, setEventCompleted] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/ticket-sales")
      .then((response) => {
        setPurchasedEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching purchased events:", error);
      });
  }, []);

  const calculateTotalAmount = () => {
    return purchasedEvents.reduce(
      (total, event) => total + event.totalPrice,
      0
    );
  };

  const calculateTotalTicketsSold = () => {
    return purchasedEvents.reduce(
      (total, event) => total + parseInt(event.quantity, 10),
      0
    );
  };

  const handleEventCompletion = (eventName) => {
    // Mark the event as completed
    setEventCompleted((prevCompleted) => ({
      ...prevCompleted,
      [eventName]: true,
    }));
  };

  const removeCompletedEvent = (eventName) => {
    // Remove the completed event from the list
    setPurchasedEvents((prevEvents) =>
      prevEvents.filter((event) => event.eventName !== eventName)
    );

    // Mark the event as not completed
    setEventCompleted((prevCompleted) => ({
      ...prevCompleted,
      [eventName]: false,
    }));

    // Make an API call to delete the event data from the backend
    axios
      .delete(`http://localhost:5000/remove-event/${eventName}`)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error('Error removing event:', error);
      });
  };

  return (
    <Container className="mt-5" style={{ marginBottom: "40px" }}>
      <h2 className="text-center mb-4">Purchased Tickets</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Purchaser Name</th> {/* New column for purchaser's name */}
            <th>Total Tickets Sold</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {purchasedEvents.map((event) => (
            <tr key={event.eventName}>
              <td>{event.eventName}</td>
              <td>{event.name}</td> {/* Display purchaser's name */}
              <td>{parseInt(event.quantity, 10)}</td>
              <td>${event.totalPrice.toFixed(2)}</td>
              <td>
                {!eventCompleted[event.eventName] ? (
                  <>
                    <Button
                      variant="danger"
                      onClick={() => removeCompletedEvent(event.eventName)}
                    >
                      Remove
                    </Button>
                  </>
                ) : (
                  "Completed"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-center">
        <strong>Total Amount Received:</strong> ${calculateTotalAmount().toFixed(2)}
      </div>
      <div className="text-center">
        <strong>Total Tickets Sold:</strong> {calculateTotalTicketsSold()}
      </div>
    </Container>
  );
};

export default Booking;