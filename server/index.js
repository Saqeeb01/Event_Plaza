const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const qrcode = require("qrcode");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "Gmail", // Change this to your email service, e.g., 'Gmail', 'Outlook', etc.
  auth: {
    user: "talikotisaqib257@gmail.com",
    pass: "mknxzxwxniyrqarl",
  },
});

app.post("/create-event", (req, res) => {
  const eventData = req.body;
  eventData.id = uuidv4();

  fs.readFile("events.json", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    const events = JSON.parse(data);

    events.push(eventData);
    fs.writeFile("events.json", JSON.stringify(events, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }
      return res.status(200).json({ message: "Event created successfully" });
    });
  });
});

app.get("/events", (req, res) => {
  fs.readFile("events.json", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    const events = JSON.parse(data);
    return res.status(200).json(events);
  });
});

app.get("/purchased-events", (req, res) => {
  fs.readFile("purchased-events.json", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    const purchasedEvents = JSON.parse(data);
    return res.status(200).json(purchasedEvents);
  });
});

app.put("/update-event/:id", (req, res) => {
  const eventId = req.params.id;
  const updatedEventData = req.body;

  fs.readFile("events.json", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    let events = JSON.parse(data);

    const eventIndex = events.findIndex((event) => event.id === eventId);
    if (eventIndex === -1) {
      return res.status(404).json({ error: "Event not found" });
    }

    events[eventIndex] = { ...events[eventIndex], ...updatedEventData };
    fs.writeFile("events.json", JSON.stringify(events, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }
      return res.status(200).json({ message: "Event updated successfully" });
    });
  });
});

app.delete("/delete-event/:id", (req, res) => {
  const eventId = req.params.id;
  console.log("Received request to delete event with ID:", eventId);

  fs.readFile("events.json", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    let events = JSON.parse(data);

    const eventIndex = events.findIndex((event) => event.id === eventId);
    if (eventIndex === -1) {
      console.log("Event not found for deletion:", eventId);
      return res.status(404).json({ error: "Event not found" });
    }

    events.splice(eventIndex, 1);
    fs.writeFile("events.json", JSON.stringify(events, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }
      return res.status(200).json({ message: "Event deleted successfully" });
    });
  });
});

app.post("/purchase-ticket", async (req, res) => {
  const purchaseData = req.body;
  // console.log("Received purchase data:", purchaseData);

  const bookingId = uuidv4(); // Generate a unique booking ID

  try {
    // Store the purchased event data in the purchased-events.json file
    const purchasesData = await fs.promises.readFile("purchases.json", "utf8");
    const purchases = JSON.parse(purchasesData);

    const purchaseWithBookingId = { ...purchaseData, bookingId };
    purchases.push(purchaseWithBookingId);

    await fs.promises.writeFile(
      "purchases.json",
      JSON.stringify(purchases, null, 2)
    );

   // Combine event details and booking ID
   const eventDetailsWithBookingId = {
    ...purchaseData,
    bookingId,
  };
    
  // Convert the object to a JSON string
  const eventDetailsString = JSON.stringify(eventDetailsWithBookingId);

  // Generate QR code for the event details and booking ID
  const qrCodeDataUrl = await qrcode.toDataURL(eventDetailsString);
    

    // // Generate QR code
    // const qrCodeDataUrl = await qrcode.toDataURL(bookingId);

    // Include all event details in the email
   // Include all event details in the email
const eventDetails = {
  eventName: purchaseData.eventName,
  date: purchaseData.date,        // Use purchaseData.date
  location: purchaseData.location, // Use purchaseData.location
};

const mailOptions = {
  from: "talikotisaqib257@gmail.com",
  to: purchaseData.email,
  subject: "Event Ticket Booking Confirmation",
  html: `<p>Thank you for booking a ticket for ${eventDetails.eventName}.</p>
  <p>Event Date: ${eventDetails.date}</p>
  <p>Event Location: ${eventDetails.location}</p>
  <!-- Include additional event details here -->
  <p>Ticket Price: ${purchaseData.ticketPrice}</p>
  <p>Number of Tickets: ${purchaseData.quantity}</p>
  <img src="${qrCodeDataUrl}" alt="QR Code" />`,
  attachments: [
    {
      filename: "qrcode.png",
      content: qrCodeDataUrl.split(";base64,").pop(),
      encoding: "base64",
    },
  ],
};
    

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message:
        "Ticket purchased successfully. An email has been sent with booking details.",
      bookingId,
      qrCodeDataUrl,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});





app.post("/ticket-sales", async (req, res) => {
  const purchaseData = req.body;

  try {
    // Generate a unique booking ID
    const bookingId = uuidv4().slice(0, 6); // Generating a 6-character booking ID

    // Calculate the total price
    const totalPrice = purchaseData.quantity * purchaseData.ticketPrice;

    // Store the ticket sales information with the booking ID
    const ticketSale = {
      bookingId,
      eventName: purchaseData.eventName,
      name: purchaseData.name,
      email: purchaseData.email,
      quantity: purchaseData.quantity,
      totalPrice,
    };

    // Read the existing ticket sales data
    const ticketSalesData = await fs.promises.readFile(
      "ticket-sales.json",
      "utf8"
    );
    const ticketSales = JSON.parse(ticketSalesData);

    // Add the new ticket sale to the array
    ticketSales.push(ticketSale);

    // Write the updated ticket sales data back to the file
    await fs.promises.writeFile(
      "ticket-sales.json",
      JSON.stringify(ticketSales, null, 2)
    );

    return res.status(200).json({
      message: "Ticket sale recorded successfully.",
      ticketSale,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/ticket-sales', async (req, res) => {
  try {
    // Retrieve and return ticket sales data
    const ticketSalesData = await fs.promises.readFile('ticket-sales.json', 'utf8');
    const ticketSales = JSON.parse(ticketSalesData);

    // Include event details in each ticket sale
    const ticketSalesWithEventDetails = ticketSales.map(ticketSale => ({
      ...ticketSale,
      eventName: ticketSale.eventName,
      date: ticketSale.date,        // Use ticketSale.date instead of purchaseData.date
      location: ticketSale.location // Use ticketSale.location instead of purchaseData.location
    }));

    return res.status(200).json(ticketSalesWithEventDetails);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


// Add a new DELETE endpoint to remove an event
app.delete("/remove-event/:eventName", (req, res) => {
  const eventName = req.params.eventName;

  fs.readFile("ticket-sales.json", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    let events = JSON.parse(data);

    const eventIndex = events.findIndex(
      (event) => event.eventName === eventName
    );
    if (eventIndex === -1) {
      console.log("Event not found for removal:", eventName);
      return res.status(404).json({ error: "Event not found" });
    }

    events.splice(eventIndex, 1);
    fs.writeFile(
      "ticket-sales.json",
      JSON.stringify(events, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "Event removed successfully" });
      }
    );
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});