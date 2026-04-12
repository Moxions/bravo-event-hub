import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function OrganizerDashboard() {
  const navigate = useNavigate();
  const [events] = useState([
    {
      id: 1,
      name: "Electric Horizon Festival",
      description: "The ultimate EDM experience",
      registered: 234,
      color: "#7c3aed",
    },
    {
      id: 2,
      name: "Midnight Jazz Sessions",
      description: "Soulful rhythms under the stars",
      registered: 156,
      color: "#f97316",
    },
    {
      id: 3,
      name: "RnB on the Lawn",
      description: "Raw talent in a serene setting",
      registered: 89,
      color: "#10b981",
    },
    {
      id: 4,
      name: "Underground Techno Night",
      description: "Deep beats until sunrise",
      registered: 198,
      color: "#2563eb",
    },
  ]);

  const genderData = { male: 30, female: 70 };
  const ageData = [
    { range: "18-24", percentage: 35 },
    { range: "25-34", percentage: 45 },
    { range: "35-44", percentage: 15 },
    { range: "45-54", percentage: 4 },
    { range: "55+", percentage: 1 },
  ];

  return (
    <div className="organizer-dashboard">
      {/* Header */}
      <header className="organizer-header">
        <div className="header-left">
          <h1>Bravo</h1>
          <nav className="header-nav">
            <a href="#discover">DISCOVER</a>
            <a href="#tickets">MY TICKETS</a>
          </nav>
        </div>
        <button
          className="create-event-btn"
          onClick={() => alert("Create event modal opening...")}
        >
          + Create New Event
        </button>
      </header>

      {/* Main Content */}
      <div className="organizer-container">
        <div className="dashboard-header-section">
          <h1>Organizer Dashboard</h1>
          <p>Manage your events and track performance</p>
        </div>

        {/* Metrics Cards */}
        <div className="metrics-grid">
          <div className="metric-card purple-bg">
            <div className="metric-icon">📅</div>
            <div className="metric-content">
              <div className="metric-label">Your Events</div>
              <div className="metric-value">12</div>
              <div className="metric-subtitle">4 active this month</div>
            </div>
          </div>

          <div className="metric-card blue-bg">
            <div className="metric-icon">👥</div>
            <div className="metric-content">
              <div className="metric-label">Total Attendees</div>
              <div className="metric-value">1,284</div>
              <div className="metric-subtitle">+234 this month</div>
            </div>
          </div>

          <div className="metric-card green-bg">
            <div className="metric-icon">📈</div>
            <div className="metric-content">
              <div className="metric-label">Avg Engagement</div>
              <div className="metric-value">87%</div>
              <div className="metric-subtitle">+12% from last month</div>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="analytics-grid">
          {/* Gender Distribution */}
          <div className="analytics-card">
            <h2>Attendee Gender Distribution</h2>
            <div className="pie-chart-container">
              <div className="pie-chart">
                <svg viewBox="0 0 100 100" width="150" height="150">
                  {/* Pie slices */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="25"
                    strokeDasharray="57.96 150"
                    transform="rotate(-90 50 50)"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#1e5a96"
                    strokeWidth="25"
                    strokeDasharray="92.04 150"
                    strokeDashoffset="-57.96"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
              <div className="legend">
                <div className="legend-item">
                  <span
                    className="legend-color"
                    style={{ backgroundColor: "#1e5a96" }}
                  ></span>
                  <span>Male (30%)</span>
                </div>
                <div className="legend-item">
                  <span
                    className="legend-color"
                    style={{ backgroundColor: "#10b981" }}
                  ></span>
                  <span>Female (70%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Age Demographics */}
          <div className="analytics-card">
            <h2>Age Demographics</h2>
            <div className="bar-chart">
              {ageData.map((data, idx) => (
                <div key={idx} className="bar-row">
                  <div className="bar-label">{data.range}</div>
                  <div className="bar-wrapper">
                    <div
                      className="bar"
                      style={{
                        width: `${data.percentage * 1.5}px`,
                        backgroundColor: "#10b981",
                      }}
                    ></div>
                  </div>
                  <div className="bar-value">{data.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Events */}
        <div className="active-events-section">
          <h2>Your Active Events</h2>
          <div className="events-grid">
            {events.map((event) => (
              <div
                key={event.id}
                className="event-card"
                style={{ borderTop: `4px solid ${event.color}` }}
              >
                <div
                  className="event-icon"
                  style={{ backgroundColor: event.color }}
                >
                  🎵
                </div>
                <h3>{event.name}</h3>
                <p>{event.description}</p>
                <div className="event-footer">
                  <span>{event.registered} registered</span>
                  <button
                    className="view-details-btn"
                    onClick={() => alert(`Viewing ${event.name}`)}
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .organizer-dashboard {
          min-height: 100vh;
          background: #f8f9fa;
        }

        .organizer-header {
          background: white;
          padding: 16px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 40px;
        }

        .header-left h1 {
          font-size: 24px;
          font-weight: 700;
          margin: 0;
          color: #1a1a1a;
        }

        .header-nav {
          display: flex;
          gap: 32px;
        }

        .header-nav a {
          text-decoration: none;
          color: #6b7280;
          font-weight: 500;
          font-size: 14px;
        }

        .header-nav a:hover {
          color: #1a1a1a;
        }

        .create-event-btn {
          background: #10b981;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
        }

        .create-event-btn:hover {
          background: #059669;
        }

        .organizer-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 24px;
        }

        .dashboard-header-section {
          margin-bottom: 40px;
        }

        .dashboard-header-section h1 {
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 8px;
          color: #1a1a1a;
        }

        .dashboard-header-section p {
          margin: 0;
          color: #6b7280;
          font-size: 16px;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .metric-card {
          padding: 24px;
          border-radius: 12px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .purple-bg {
          background: linear-gradient(135deg, #e9d5ff 0%, #f3e8ff 100%);
        }

        .blue-bg {
          background: linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%);
        }

        .green-bg {
          background: linear-gradient(135deg, #d1fae5 0%, #ecfdf5 100%);
        }

        .metric-icon {
          font-size: 32px;
        }

        .metric-content {
          flex: 1;
        }

        .metric-label {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 4px;
        }

        .metric-value {
          font-size: 32px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .metric-subtitle {
          font-size: 12px;
          color: #9ca3af;
          margin-top: 4px;
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .analytics-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }

        .analytics-card h2 {
          margin: 0 0 24px;
          font-size: 18px;
          font-weight: 600;
        }

        .pie-chart-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32px;
        }

        .legend {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 2px;
        }

        .bar-chart {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .bar-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .bar-label {
          font-size: 13px;
          color: #6b7280;
          width: 40px;
        }

        .bar-wrapper {
          flex: 1;
          background: #f3f4f6;
          border-radius: 4px;
          height: 24px;
          display: flex;
          align-items: center;
        }

        .bar {
          height: 16px;
          border-radius: 2px;
        }

        .bar-value {
          font-size: 13px;
          font-weight: 600;
          color: #1a1a1a;
          width: 35px;
          text-align: right;
        }

        .active-events-section {
          margin-bottom: 40px;
        }

        .active-events-section h2 {
          margin: 0 0 24px;
          font-size: 20px;
          font-weight: 600;
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
        }

        .event-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s;
        }

        .event-card:hover {
          transform: translateY(-4px);
        }

        .event-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          margin-bottom: 12px;
        }

        .event-card h3 {
          margin: 0 0 8px;
          font-size: 16px;
          font-weight: 600;
        }

        .event-card p {
          margin: 0 0 16px;
          font-size: 13px;
          color: #6b7280;
        }

        .event-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          color: #6b7280;
        }

        .view-details-btn {
          background: none;
          border: none;
          color: #10b981;
          font-weight: 600;
          cursor: pointer;
          font-size: 13px;
        }

        .view-details-btn:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
