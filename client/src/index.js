import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './Components/App';
import { TicketSalesProvider } from "./TicketSalesContext";

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <Router>
      <TicketSalesProvider>
      <App />
    </TicketSalesProvider>
  </Router>
);
