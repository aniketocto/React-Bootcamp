import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
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
          <div className="event-grid">
            <div className="event-card">
              <div className="event-img placeholder-img">Concert</div>
              <div className="event-body">
                <p className="event-title">Midnight Beats: DJ Night</p>
                <p className="event-meta">Andheri · Fri · 10:00 PM</p>
                <p className="event-price">From ₹799</p>
                <button className="event-book-btn">Book now</button>
              </div>
            </div>

            <div className="event-card">
              <div className="event-img placeholder-img">Comedy</div>
              <div className="event-body">
                <p className="event-title">Laugh Riot Stand-up Special</p>
                <p className="event-meta">BKC · Sat · 7:30 PM</p>
                <p className="event-price">From ₹499</p>
                <button className="event-book-btn">Book now</button>
              </div>
            </div>

            <div className="event-card">
              <div className="event-img placeholder-img">Sports</div>
              <div className="event-body">
                <p className="event-title">Night Football Arena</p>
                <p className="event-meta">Lower Parel · Sun · 9:00 PM</p>
                <p className="event-price">From ₹349</p>
                <button className="event-book-btn">Book now</button>
              </div>
            </div>
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
