import React from "react";
import { useNavigate } from "react-router-dom";
import { signInAnonymous } from "../auth";
import "./Landing.css";

export default function PortalSelect() {
  const navigate = useNavigate();

  const handleAnonymousLogin = async () => {
    const result = await signInAnonymous();
    if (result.success) {
      navigate("/browse-events");
    }
  };

  return (
    <div className="landing-hero">
      <header className="landing-header">
        <div className="brand-logo">📅</div>
        <h1 className="landing-title">Choose Your Portal</h1>
        <p className="landing-tag">Pick where you want to continue</p>
      </header>

      <main className="landing-main">
        <div className="role-cards">
          <div className="role-card">
            <h3>Attendee Portal</h3>
            <p className="card-desc">Browse events and register quickly</p>
            <button
              className="primary-btn"
              onClick={() => navigate("/signin/attendee")}
            >
              Continue as Attendee
            </button>
            <button
              className="ghost-btn"
              onClick={() => navigate("/browse-events")}
              style={{ marginTop: 10 }}
            >
              Browse events
            </button>
            <button
              className="ghost-btn"
              onClick={() => navigate("/cart")}
              style={{ marginTop: 10 }}
            >
              Open cart
            </button>
            <button
              className="ghost-btn"
              onClick={() => navigate("/signup/attendee")}
              style={{ marginTop: 10 }}
            >
              Create attendee account
            </button>
          </div>

          <div className="role-card">
            <h3>Organiser Portal</h3>
            <p className="card-desc">Create, publish, and manage events</p>
            <button
              className="primary-btn"
              onClick={() => navigate("/signin/organizer")}
            >
              Continue as Organiser
            </button>
            <button
              className="ghost-btn"
              onClick={() => navigate("/signup/organizer")}
              style={{ marginTop: 10 }}
            >
              Create organiser account
            </button>
          </div>

          <div className="role-card">
            <h3>Browse Without Login</h3>
            <p className="card-desc">Explore events anonymously</p>
            <button
              className="primary-btn"
              onClick={handleAnonymousLogin}
            >
              Continue Without Login
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
