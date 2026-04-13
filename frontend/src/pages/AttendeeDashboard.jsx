import React from "react";
import "./SharedDashboard.css";
import "./AttendeeDashboard.css";

const upcomingPasses = [
  {
    tag: "FESTIVAL",
    icon: "◉",
    title: "Electric Horizon Festival",
    subtitle: "The ultimate EDM experience",
    date: "November 15, 2024",
    venue: "Neon Fields Arena",
    theme: "purple",
  },
  {
    tag: "CLUB NIGHT",
    icon: "▷",
    title: "Underground Techno Night",
    subtitle: "Deep beats until sunrise",
    date: "December 20, 2024",
    venue: "Midnight Club",
    theme: "blue",
  },
  {
    tag: "CLUB NIGHT",
    icon: "▷",
    title: "Rock N Roll",
    subtitle: "Deep beats until sunrise",
    date: "December 20, 2024",
    venue: "Warehouse 42",
    theme: "blue",
  },
  {
    tag: "INDIE",
    icon: "♫",
    title: "RnB on the Lawn",
    subtitle: "Raw talent in a serene setting",
    date: "December 10, 2024",
    venue: "South side Arena",
    theme: "green",
  },
];

const popularEvents = [
  {
    tag: "INDIE",
    icon: "♫",
    title: "Summer Classics",
    subtitle: "Raw talent in a serene setting",
    date: "December 10, 2024",
    venue: "Central Park Conservatory",
    theme: "green",
  },
  {
    tag: "CONCERT",
    icon: "⚯",
    title: "Midnight Jazz Sessions",
    subtitle: "Soulful rhythms under the stars",
    date: "December 5, 2024",
    venue: "The Blue Note Club",
    theme: "orange",
  },
  {
    tag: "FESTIVAL",
    icon: "◉",
    title: "Electric Horizon Festival",
    subtitle: "The ultimate EDM experience",
    date: "November 15, 2024",
    venue: "Neon Fields Arena",
    theme: "purple",
  },
];

const recentlyAdded = [
  {
    tag: "CLUB NIGHT",
    icon: "▷",
    title: "Underground Techno Night",
    subtitle: "Deep beats until sunrise",
    date: "December 20, 2024",
    venue: "Midnight Club",
    theme: "blue",
  },
  {
    tag: "INDIE",
    icon: "♫",
    title: "RnB on the Lawn",
    subtitle: "Raw talent in a serene setting",
    date: "December 10, 2024",
    venue: "South side Arena",
    theme: "green",
  },
  {
    tag: "CONCERT",
    icon: "⚯",
    title: "Midnight Jazz Sessions",
    subtitle: "Soulful rhythms under the stars",
    date: "December 5, 2024",
    venue: "The Blue Note Club",
    theme: "orange",
  },
];

function EventCard({ event }) {
  return (
    <article className="att-card ui-card">
      <div className={`att-card-top ui-card-top ${event.theme}`}>
        <span className="att-chip ui-chip">{event.tag}</span>
        <span className="att-card-icon">{event.icon}</span>
      </div>
      <div className="att-card-body">
        <h3>{event.title}</h3>
        <p className="att-muted">{event.subtitle}</p>
        <p className="att-meta">📅 {event.date}</p>
        <p className="att-meta">📍 {event.venue}</p>
        <button className="att-view-btn ui-primary-btn" type="button">
          View Details
        </button>
      </div>
    </article>
  );
}

export default function AttendeeDashboard() {
  return (
    <div className="att-page ui-page">
      <header className="att-navbar">
        <div className="att-brand-wrap">
          <div className="att-logo-box">▢</div>
          <div className="att-brand">Bravo</div>
        </div>

        <nav className="att-main-nav">
          <a href="#discover">DISCOVER</a>
          <a href="#tickets">MY TICKETS</a>
        </nav>

        <div className="att-nav-right">
          <button className="att-icon-btn" type="button">
            ◌
          </button>
          <button className="att-avatar" type="button">
            KM
          </button>
        </div>
      </header>

      <main className="att-shell ui-shell">
        <section className="att-hero-row">
          <div>
            <h1>
              Attendee. <span>Dashboard.</span>
            </h1>
            <p>Keep track of the shows you love and scan in to new experiences.</p>
          </div>
          <button className="att-scan-btn" type="button">
            ⌁ Scan to Register
          </button>
        </section>

        <section className="att-action-grid">
          <article className="att-action-card">
            <h3>Browse Events</h3>
            <p>Discover amazing shows near you</p>
          </article>
          <article className="att-action-card">
            <h3>Scan QR Code</h3>
            <p>Quick registration with QR</p>
          </article>
          <article className="att-action-card">
            <h3>My Events</h3>
            <p>View all your registrations</p>
          </article>
        </section>

        <section className="att-section ui-section" id="tickets">
          <h2 className="ui-section-title">📅 Your Upcoming Passes</h2>
          <div className="att-grid-four ui-grid-four">
            {upcomingPasses.map((event) => (
              <EventCard key={`${event.title}-${event.date}`} event={event} />
            ))}
          </div>
        </section>

        <section className="att-section ui-section" id="discover">
          <div className="att-section-head ui-section-head">
            <h2 className="ui-section-title">Popular Events</h2>
            <button className="att-link-btn ui-link-btn" type="button">
              View All →
            </button>
          </div>
          <div className="att-grid-three ui-grid-three">
            {popularEvents.map((event) => (
              <EventCard key={`${event.title}-${event.date}`} event={event} />
            ))}
          </div>
        </section>

        <section className="att-section ui-section">
          <div className="att-section-head ui-section-head">
            <h2 className="ui-section-title">Recently Added</h2>
            <button className="att-link-btn ui-link-btn" type="button">
              View All →
            </button>
          </div>
          <div className="att-grid-three ui-grid-three">
            {recentlyAdded.map((event) => (
              <EventCard key={`${event.title}-${event.date}`} event={event} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
