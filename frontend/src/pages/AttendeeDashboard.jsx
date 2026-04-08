import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

export default function AttendeeDashboard() {
  const navigate = useNavigate()

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Attendee Dashboard</h1>
        <p>Welcome to the Bravo event attendee dashboard.</p>
      </header>

      <section className="test-nav">
        <h2>Test Navigation</h2>
        <div className="nav-buttons">
          <button onClick={() => navigate('/')} className="nav-btn landing-btn">
            📄 Landing Page
          </button>
          <button onClick={() => navigate('/signin')} className="nav-btn signin-btn">
            🔓 Sign In
          </button>
          <button onClick={() => navigate('/signup')} className="nav-btn signup-btn">
            ✍️ Sign Up
          </button>
        </div>
      </section>

      <section className="features-nav">
        <h2>Feature Testing</h2>
        <div className="feature-buttons">
          <button 
            onClick={() => alert('🎫 Attendee Browse Events - Coming Soon')} 
            className="feature-btn browse-btn"
          >
            🎫 Attendee Browse Events
          </button>
          <button 
            onClick={() => alert('📋 Attendee Event Details & Registration - Coming Soon')} 
            className="feature-btn details-btn"
          >
            📋 Details & Registration
          </button>
          <button 
            onClick={() => alert('🎨 UI/UX & QR - Coming Soon')} 
            className="feature-btn qr-btn"
          >
            🎨 UI/UX & QR
          </button>
        </div>
      </section>

      <section className="dashboard-content">
        <h2>Your Events</h2>
        <p>Events will appear here once integrated with backend.</p>
      </section>
    </div>
  )
}
