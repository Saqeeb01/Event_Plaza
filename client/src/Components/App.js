import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import EventPlazaNavbar from './EventPlazaNavbar';
import EventPlazaFooter from './EventPlazaFooter';
import Home from './Home';
import ManageEvents from './ManageEvents';
import Contact from './Contact';
import CreateEvent from './CreateEvent';
import BrowseEvents from './BrowseEvents';
import { HostEvents } from './HostEvents';
import MyTickets from './MyTickets';
import AccountProfile from './AccountProfile';
import { AuthContext } from '../AuthContext';
import Booking from './Booking';

const App = () => {
  const [purchasedEvents, setPurchasedEvents] = useState([]);

  const handleTicketPurchase = (ticketData) => {
    // Update the purchasedEvents state
    setPurchasedEvents((prevEvents) => [...prevEvents, ticketData]);
  };

  return (
    <div>
      <EventPlazaNavbar />
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browseevents" element={<BrowseEvents onTicketPurchase={handleTicketPurchase} />} />
          <Route path="/manage-events" element={<ManageEvents />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/hostevents" element={<HostEvents />} />
          <Route path="/my-tickets" element={<MyTickets purchasedEvents={purchasedEvents} />} />
          <Route path="/profile" element={<AccountProfile />} />
          <Route path="/authcontext" element={<AuthContext />} />
          <Route path="/booking" element={<Booking purchasedEvents={purchasedEvents} />} />
        </Routes>
      </div>
      <EventPlazaFooter />
    </div>
  );
};

export default App;
