import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TicketSalesContext = createContext();

export function TicketSalesProvider({ children }) {
  const [ticketSales, setTicketSales] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/ticket-sales") // Replace with your API endpoint
      .then((response) => {
        setTicketSales(response.data);
      })
      .catch((error) => {
        console.error("Error fetching ticket sales data:", error);
      });
  }, []);

  return (
    <TicketSalesContext.Provider value={ticketSales}>
      {children}
    </TicketSalesContext.Provider>
  );
}

export function useTicketSales() {
  return useContext(TicketSalesContext);
}
