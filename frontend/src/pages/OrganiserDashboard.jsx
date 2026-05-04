import React from "react";
import { Link } from "react-router-dom";
import "./SharedDashboard.css";
import "./OrganiserDashboard.css";

const metrics = [
  {
    label: "Your Events",
    value: "12",
    note: "4 active this month",
    icon: "📅",
    theme: "org-theme-purple",
  },
  {
    label: "Total Attendees",
    value: "1,284",
    note: "+234 this month",
    icon: "👥",
    theme: "org-theme-blue",
  },
  {
    label: "Avg Engagement",
    value: "87%",
    note: "+12% from last month",
    icon: "📈",
    theme: "org-theme-green",
  },
];

const activeEvents = [
  {
    id: 1,
    tag: "FESTIVAL",
    icon: "◉",
    title: "Electric Horizon Festival",
    subtitle: "The ultimate EDM experience",
    registered: "234 registered",
    theme: "purple",
  },
  {
    id: 2,
    tag: "CONCERT",
    icon: "⚯",
    title: "Midnight Jazz Sessions",
    subtitle: "Soulful rhythms under the stars",
    registered: "156 registered",
    theme: "orange",
  },
  {
    id: 3,
    tag: "INDIE",
    icon: "♫",
    title: "RnB on the Lawn",
    subtitle: "Raw talent in a serene setting",
    registered: "89 registered",
    theme: "green",
  },
  {
    id: 4,
    tag: "INDIE",
    icon: "♫",
    title: "RnB on the Lawn",
    subtitle: "Raw talent in a serene setting",
    registered: "89 registered",
    theme: "purple",
  },
];

function OrganizerEventCard({ event }) {
  return (
    <article className="org-event-card ui-card">
      <div className={`org-event-top ui-card-top ${event.theme}`}>
        <span className="ui-chip">{event.tag}</span>
        <span className="org-event-icon">{event.icon}</span>
      </div>
      <div className="org-event-body">
        <h3>{event.title}</h3>
        <p>{event.subtitle}</p>
        <div className="org-event-footer">
          <span>{event.registered}</span>
          <div className="org-event-actions">
            <button className="ui-secondary-btn" type="button">
              View Details
            </button>
            <Link
              to={`/dashboard/organiser/edit-event/${event.id}`}
              className="ui-primary-btn"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function OrganiserDashboard() {
  return (
    <div className="org-page ui-page">
      <header className="org-navbar">
        <div className="org-brand-wrap">
          <div className="org-logo">▢</div>
          <div className="org-brand">Bravo</div>
        </div>

        <nav className="org-nav-links">
          <a href="#analytics">ANALYTICS</a>
          <a href="#events">MY EVENTS</a>
        </nav>

        <Link to="/dashboard/organiser/create-event" className="org-create-btn">
          + Create New Event
        </Link>
      </header>

      <main className="org-shell ui-shell">
        <section className="org-hero">
          <h1>
            Organiser. <span>Dashboard.</span>
          </h1>
          <p>
            Manage your events and monitor audience performance in one place.
          </p>
        </section>

        <section className="ui-section" id="analytics">
          <div className="ui-section-head">
            <h2 className="ui-section-title">Overview Metrics</h2>
          </div>
          <div className="org-metric-grid ui-grid-three">
            {metrics.map((metric) => (
              <article
                key={metric.label}
                className={`org-metric-card ui-card ${metric.theme}`}
              >
                <div className="org-metric-icon">{metric.icon}</div>
                <div>
                  <p className="org-metric-label">{metric.label}</p>
                  <h3 className="org-metric-value">{metric.value}</h3>
                  <p className="org-metric-note">{metric.note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="ui-section" id="events">
          <div className="ui-section-head">
            <h2 className="ui-section-title">Active Events</h2>
            <button className="ui-link-btn" type="button">
              View All →
            </button>
          </div>
          <div className="ui-grid-three">
            {activeEvents.map((event) => (
              <OrganizerEventCard key={event.title} event={event} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
