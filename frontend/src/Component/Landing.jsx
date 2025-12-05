import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
    const [events, setEvents] = useState([]);
const [eventsLoading, setEventsLoading] = useState(false);
const [eventsError, setEventsError] = useState("");

useEffect(() => {
  const fetchEvents = async () => {
    try {
      setEventsLoading(true);
      setEventsError("");

      const res = await fetch("http://localhost:5000/events", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // If this endpoint is protected, uncomment this:
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json().catch(() => []);

      if (!res.ok) {
        throw new Error(data.message || "Failed to load events");
      }

      setEvents(data); // data is an array
    } catch (err) {
      console.error("Error fetching events:", err);
      setEventsError(err.message || "Could not load events");
    } finally {
      setEventsLoading(false);
    }
  };

  fetchEvents();
}, []);

    
  return (
    <div className="landing-root">
      {/* NAVBAR */}
      <header className="landing-nav">
        <div className="nav-logo">EventEase</div>

        <nav className="nav-links">
          <a href="#trending">Trending</a>
          <a href="#categories">Categories</a>
          <a href="#about">About</a>
        </nav>

        <div className="nav-actions">
          <Link to="/login" className="nav-login-btn">
            Login
          </Link>
          <Link to="/signup" className="nav-signup-btn">
            Sign Up
            </Link>
        </div>
      </header>

      {/* MAIN */}
      <main className="landing-main">
        {/* HERO: search for events */}
        <section className="hero">
          <div className="hero-left">
            <h1>
              Book amazing <span>events</span> around you.
            </h1>
            <p>
              From concerts and stand-up shows to sports and festivals – discover
              what’s happening in your city and book your seat instantly.
            </p>

            {/* Search bar */}
            <div className="hero-search">
  <div className="hero-search-top">
    <select className="hero-city">
      <option>Mumbai</option>
      <option>Pune</option>
      <option>Delhi</option>
      <option>Bengaluru</option>
    </select>

    <input
      className="hero-input"
      type="text"
      placeholder="Search for events, artists or venues"
    />
  </div>

  <button className="hero-search-btn">Search</button>
</div>


            {/* quick tags */}
            <div className="hero-tags">
              <span>#Tonight</span>
              <span>#ThisWeekend</span>
              <span>#Concerts</span>
              <span>#StandupComedy</span>
            </div>
          </div>

          <div className="hero-right">
            {/* simple preview card */}
            <div className="preview-card">
              <p className="preview-label">Trending today</p>
              <p className="preview-title">Sunset Live: Indie Concert</p>
              <p className="preview-meta">Bandra · 8:00 PM · From ₹599</p>
              <div className="preview-footer">
                <span className="preview-pill">Music</span>
                <button className="preview-book-btn">Book now</button>
              </div>
            </div>
          </div>
        </section>

        {/* TRENDING EVENTS */}
        <section id="trending" className="trending">
  <h2>Trending near you</h2>

  {eventsLoading && <p>Loading events...</p>}

  {eventsError && <p style={{ color: "red", fontSize: "14px" }}>{eventsError}</p>}

  {!eventsLoading && !eventsError && events.length === 0 && (
    <p>No events available right now.</p>
  )}

  <div className="event-grid">
    {!eventsLoading &&
      !eventsError &&
      events.map((event) => {
        const dateObj = new Date(event.date);
        const dateStr = dateObj.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
        });

        return (
          <div className="event-card" key={event._id}>
            {/* top red area – show type / description */}
            <div className="event-header">
              <span>{event.description || "Event"}</span>
            </div>

            {/* white area */}
            <div className="event-body">
              <p className="event-title">{event.title}</p>

              <p className="event-meta">
                {event.venue} · {dateStr} · {event.startAt} – {event.endAt}
              </p>

              <p className="event-price">
                Capacity: {event.capacity} · Registered: {event.totalRegistrations}
              </p>

              <button
                className="event-book-btn"
                onClick={() => {
                  // later you can navigate to /events/:id
                  alert(`Booking flow coming soon for: ${event.title}`);
                }}
              >
                Book now
              </button>
            </div>
          </div>
        );
      })}
  </div>
</section>

        {/* CATEGORIES */}
        <section id="categories" className="categories">
          <h2>Browse by category</h2>
          <div className="category-grid">
            <div className="category-card">🎵 Music & Concerts</div>
            <div className="category-card">😂 Stand-up & Comedy</div>
            <div className="category-card">🏟️ Sports & Games</div>
            <div className="category-card">🎭 Theatre & Arts</div>
            <div className="category-card">👨‍🏫 Workshops</div>
            <div className="category-card">🎉 Festivals & Parties</div>
          </div>
        </section>

        {/* ABOUT / CTA */}
        <section id="about" className="landing-footer">
          <p className="footer-heading">Never miss an event again.</p>
          <p className="footer-text">
            Get personalised event recommendations, instant booking and secure
            payments – all in one app.
          </p>
          <Link to="/login" className="footer-cta">
            Login to book with EventEase
          </Link>
          <p className="footer-small">
            © {new Date().getFullYear()} EventEase. All rights reserved.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Landing;
