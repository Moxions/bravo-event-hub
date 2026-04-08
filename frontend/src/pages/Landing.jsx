import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-hero">
      <header className="landing-header">
        <div className="brand-logo">📅</div>
        <h1 className="landing-title">Bravo Event Hub</h1>
        <p className="landing-tag">Your Stage. Your Sound.</p>
      </header>

      <main className="landing-main">
        <h2 className="landing-welcome">Welcome 👋</h2>
        <p className="landing-sub">Choose how you want to use the platform</p>

        <div className="role-cards">
          <div className="role-card">
            <h3>Attendee</h3>
            <p className="card-desc">Browse and join events</p>
            <button className="primary-btn" onClick={() => navigate('/signup')}>Continue</button>
          </div>

          <div className="role-card">
            <h3>Organizer</h3>
            <p className="card-desc">Create and manage events</p>
            <button className="primary-btn" onClick={() => navigate('/signup')}>Continue</button>
          </div>
        </div>

        <div className="landing-links">
          <a href="/signin">Log in</a>
          <span> · </span>
          <a href="/signup">Sign up</a>
        </div>
      </main>
    </div>
  );
}
