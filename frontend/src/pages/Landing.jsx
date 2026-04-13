import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

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
        <p className="landing-sub">Start by choosing your portal type</p>

        <button className="primary-btn" onClick={() => navigate("/portal")}>
          Choose Portal
        </button>
      </main>
    </div>
  );
}
