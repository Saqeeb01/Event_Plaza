import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const AccountProfile = () => {
  // Simulated user profile data
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    preferences: {
      receiveEmails: true,
      darkMode: false,
    },
  });

  const handleSaveChanges = (event) => {
    event.preventDefault();
    // Update user profile data in the backend
    // For this example, we'll simulate saving changes
    console.log('Profile changes saved:', profile);
  };

  return (
    <Container>
      <h1>Account Profile</h1>
      <Form onSubmit={handleSaveChanges}>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={profile.firstName}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={profile.lastName}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="receiveEmails">
          <Form.Check
            type="checkbox"
            label="Receive Emails"
            checked={profile.preferences.receiveEmails}
            onChange={(e) =>
              setProfile({
                ...profile,
                preferences: {
                  ...profile.preferences,
                  receiveEmails: e.target.checked,
                },
              })
            }
          />
        </Form.Group>

        <Form.Group controlId="darkMode">
          <Form.Check
            type="checkbox"
            label="Dark Mode"
            checked={profile.preferences.darkMode}
            onChange={(e) =>
              setProfile({
                ...profile,
                preferences: {
                  ...profile.preferences,
                  darkMode: e.target.checked,
                },
              })
            }
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default AccountProfile;
