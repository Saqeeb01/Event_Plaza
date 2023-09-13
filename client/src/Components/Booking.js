import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button } from "react-bootstrap";
import "./Booking.css"; // Create a CSS file for custom styles (optional)

const Booking = () => {
  const [purchasedEvents, setPurchasedEvents] = useState([]);
  const [eventCompleted, setEventCompleted] = useState({});

  useEffect(() => {
    axios
      .get("https://event-plaza.onrender.com/ticket-sales")
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
      .delete(`https://event-plaza.onrender.com/remove-event/${eventName}`)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error removing event:", error);
      });
  };

  return (
    <Container className="mt-5" style={{ marginBottom: "40px" }}>
      <h2 className="text-center mb-4">Purchased Tickets</h2>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Event Name</th>
              <th className="d-none d-sm-table-cell">Purchaser Name</th>
              <th>Total Tickets Sold</th>
              <th>Total Amount</th>
              <th className="d-none d-sm-table-cell">Actions</th>
            </tr>
          </thead>

          <tbody>
            {purchasedEvents.map((event) => (
              <tr key={event.eventName}>
                <td>{event.eventName}</td>
                <td className="d-none d-sm-table-cell">{event.name}</td>
                <td>{parseInt(event.quantity, 10)}</td>
                <td>${event.totalPrice.toFixed(2)}</td>
                <td className="d-none d-sm-table-cell">
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
      </div>

      <div className="text-center">
        <strong>Total Amount Received:</strong> $
        {calculateTotalAmount().toFixed(2)}
      </div>
      <div className="text-center">
        <strong>Total Tickets Sold:</strong> {calculateTotalTicketsSold()}
      </div>
    </Container>
  );
};

export default Booking;
