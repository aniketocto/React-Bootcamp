import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

const EventDetails = () => {
  const { id } = useParams(); // event id from URL
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState("");
  const [ticket, setTicket] = useState(null); // ticket for this event (if booked)

  // 🔹 Load event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/events/${id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Error loading event");

        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  // 🔹 Load existing ticket for this event from localStorage (if user already booked before)
  useEffect(() => {
    const storedTicket = localStorage.getItem(`ticket_${id}`);
    if (storedTicket) {
      try {
        const parsed = JSON.parse(storedTicket);
        setTicket(parsed);
      } catch (e) {
        console.error("Failed to parse stored ticket", e);
      }
    }
  }, [id]);

  // 🔹 Booking handler
  const handleBooking = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    setBookingLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/bookings/${id}/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventId: id,
          // NOTE: ideally backend should get userId from token, not from frontend
          userId: "66c8b9aeee1234567890abcd",
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Booking failed");

      // data.ticket shape (from you):
      // {
      //   _id, event, user, status, qrVerified, createdAt, ...
      // }
      const t = data.ticket;

      const ticketData = {
        ticketId: t._id,
        eventId: t.event,
        userId: t.user,
        status: t.status,
        qrVerified: t.qrVerified,
        createdAt: t.createdAt,
        // enrich from event
        eventTitle: event.title,
        venue: event.venue,
        date: event.date,
        startAt: event.startAt,
        endAt: event.endAt,
      };

      // set in state
      setTicket(ticketData);

      // ✅ persist in localStorage so it shows even on refresh / revisit
      localStorage.setItem(`ticket_${id}`, JSON.stringify(ticketData));

      alert("Booking successful! 🎉 Ticket generated below.");
    } catch (err) {
      alert(err.message);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!event) return <p>No event found</p>;

  // 🔹 Data encoded in QR (used to verify at gate)
  const qrValue = ticket
    ? JSON.stringify({
        ticketId: ticket.ticketId,
        eventId: ticket.eventId,
        userId: ticket.userId,
        status: ticket.status,
      })
    : "";

  return (
    <div style={{ padding: "40px" }}>
      <h1>{event.title}</h1>
      <p>{event.description}</p>

      <p>
        <strong>Date:</strong>{" "}
        {new Date(event.date).toLocaleDateString("en-IN")}
      </p>
      <p>
        <strong>Venue:</strong> {event.venue}
      </p>

      <p>
        <strong>Time:</strong> {event.startAt} - {event.endAt}
      </p>

      <p>
        <strong>Capacity:</strong> {event.capacity}
      </p>

      <p>
        <strong>Registered:</strong> {event.totalRegistrations}
      </p>

      <button
        onClick={handleBooking}
        disabled={bookingLoading}
        style={{
          padding: "14px 24px",
          background: "#ff4b5c",
          border: "none",
          borderRadius: "12px",
          color: "#fff",
          fontSize: "18px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        {bookingLoading ? "Booking..." : "Book Ticket"}
      </button>

      {/* 🎫 Ticket + QR (visible if user has ticket, from booking or from localStorage) */}
      {ticket && (
        <div
          style={{
            marginTop: "40px",
            padding: "20px",
            borderRadius: "16px",
            border: "1px solid #ddd",
            maxWidth: "420px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            background: "#fff",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>Your e-Ticket</h2>
          <p style={{ margin: "4px 0" }}>
            <strong>Event:</strong> {ticket.eventTitle}
          </p>
          <p style={{ margin: "4px 0" }}>
            <strong>Venue:</strong> {ticket.venue}
          </p>
          <p style={{ margin: "4px 0" }}>
            <strong>Date:</strong>{" "}
            {new Date(ticket.date).toLocaleDateString("en-IN")}
          </p>
          <p style={{ margin: "4px 0" }}>
            <strong>Time:</strong> {ticket.startAt} - {ticket.endAt}
          </p>
          <p style={{ margin: "4px 0" }}>
            <strong>Status:</strong>{" "}
            {ticket.status
              ? ticket.status.charAt(0).toUpperCase() +
                ticket.status.slice(1)
              : "-"}
          </p>
          <p style={{ margin: "4px 0", fontSize: "12px", color: "#555" }}>
            <strong>Ticket ID:</strong> {ticket.ticketId}
          </p>
          <p style={{ margin: "4px 0", fontSize: "12px", color: "#555" }}>
            <strong>Booked At:</strong>{" "}
            {ticket.createdAt
              ? new Date(ticket.createdAt).toLocaleString("en-IN")
              : "-"}
          </p>

          <div
            style={{
              marginTop: "16px",
              background: "#f9f9f9",
              padding: "12px",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <QRCode value={qrValue} size={180} />
          </div>

          <p
            style={{
              marginTop: "10px",
              fontSize: "12px",
              color: "#555",
              textAlign: "center",
            }}
          >
            Show this QR code at the entry gate for verification.
          </p>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
