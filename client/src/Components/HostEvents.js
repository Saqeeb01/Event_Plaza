import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import CreateEvent from './CreateEvent';
import ManageEvents from './ManageEvents';

export const HostEvents = () => {
  

  return (
    <div>
      <h1>Host Events</h1>
      <Tabs defaultActiveKey="create-event" id="event-tabs">
        <Tab eventKey="create-event" title="Create Event">
          <CreateEvent />
        </Tab>
        <Tab eventKey="manage-events" title="Manage Events">
          <ManageEvents />
        </Tab>
      </Tabs>
    </div>
  );
};
