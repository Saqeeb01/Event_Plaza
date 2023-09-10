import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const MyTickets = () => {
  // Simulated data for purchased tickets
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Fetch user's purchased tickets from an API or local storage
    // Update the `tickets` state with the fetched data
    // For now, let's simulate some sample ticket data
    const sampleTickets = [
      {
        eventId: 1,
        eventName: 'Sample Event 1',
        ticketId: 'TICKET123',
      },
      {
        eventId: 2,
        eventName: 'Sample Event 2',
        ticketId: 'TICKET456',
      },
    ];

    setTickets(sampleTickets);
  }, []);

  return (
    <Container>
      <h1>My Tickets</h1>
      {tickets.length === 0 ? (
        <p>No purchased tickets.</p>
      ) : (
        <Row>
          {tickets.map((ticket, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{ticket.eventName}</Card.Title>
                  <Card.Text>Ticket ID: {ticket.ticketId}</Card.Text>
                  <button className="btn btn-primary">View QR Code</button>
                  <button className="btn btn-danger">Cancel Ticket</button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyTickets;
