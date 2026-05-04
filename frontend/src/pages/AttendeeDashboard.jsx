import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SharedDashboard.css";
import "./AttendeeDashboard.css";
import { getCurrentUser, signOut } from "../auth";
import {
  getEvents,
  getEventsByUser,
  registerForEvent,
} from "../events";

const toDate = (value) => {
  if (!value) return null;
  if (typeof value?.toDate === "function") return value.toDate();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const normalizeEvent = (event) => {
  const eventDate = toDate(event.date);
  const createdDate = toDate(event.createdAt);
  const type = String(event.eventType || event.primaryGenre || "event")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
  const themeMap = {
    festival: "purple",
    concert: "orange",
    indie: "green",
    "club-night": "blue",
    club: "blue",
  };

  return {
    ...event,
    tag: String(event.primaryGenre || event.eventType || "EVENT").toUpperCase(),
    icon: "◉",
    subtitle: event.tagline || event.description || "No description yet.",
    date: eventDate
      ? eventDate.toLocaleDateString(undefined, {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "Date not set",
    venue: event.venue || "Venue not set",
    attendeeCount: Number(event.attendeeCount || 0),
    theme: themeMap[type] || "green",
    eventDate,
    createdDate,
  };
};

function EventCard({ event, onRegister, registering }) {
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
        <p className="att-meta">👥 {event.attendeeCount} registered</p>
        <button
          className="att-view-btn ui-primary-btn"
          type="button"
          onClick={() => onRegister(event.id)}
          disabled={registering}
        >
          {registering ? "Registering..." : "Register"}
        </button>
      </div>
    </article>
  );
}

export default function AttendeeDashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [registeringId, setRegisteringId] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [allEvents, userEvents] = await Promise.all([
        getEvents(),
        user?.uid ? getEventsByUser(user.uid) : Promise.resolve([]),
      ]);

      setEvents(allEvents.map(normalizeEvent));
      setMyEvents(userEvents.map((entry) => ({ ...entry, event: normalizeEvent(entry.event) })));
    } catch (loadError) {
      setError(loadError?.message || "Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  const upcomingPasses = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return [...events]
      .filter((event) => event.eventDate && event.eventDate >= now)
      .sort((left, right) => left.eventDate - right.eventDate)
      .slice(0, 4);
  }, [events]);

  const popularEvents = useMemo(() => {
    return [...events]
      .sort((left, right) => right.attendeeCount - left.attendeeCount)
      .slice(0, 6);
  }, [events]);

  const recentlyAdded = useMemo(() => {
    return [...events]
      .sort((left, right) => (right.createdDate || 0) - (left.createdDate || 0))
      .slice(0, 6);
  }, [events]);

  const handleRegister = async (eventId) => {
    if (!user?.uid) {
      setError("Please sign in to register for events.");
      return;
    }

    try {
      setRegisteringId(eventId);
      setStatus("");
      await registerForEvent(user.uid, eventId);
      setStatus("Registration successful.");
      await loadData();
    } catch (registerError) {
      setError(registerError?.message || "Registration failed.");
    } finally {
      setRegisteringId(null);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/portal");
  };

  const initials = (user?.email || "GU")
    .split(/[@._\-\s]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk[0])
    .join("")
    .toUpperCase();

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
          <button className="att-icon-btn" type="button" onClick={loadData}>
            ↻
          </button>
          <button className="att-logout" type="button" onClick={handleLogout}>
            Log out
          </button>
          <button className="att-avatar" type="button">
            {initials || "GU"}
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
            {events.length} Events Available
          </button>
        </section>

        <section className="att-action-grid">
          <article className="att-action-card">
            <h3>Browse Events</h3>
            <p>{events.length} events currently in the database</p>
          </article>
          <article className="att-action-card">
            <h3>Popular Right Now</h3>
            <p>{popularEvents.length} trending events</p>
          </article>
          <article className="att-action-card">
            <h3>My Events</h3>
            <p>{myEvents.length} registrations</p>
          </article>
        </section>

        {status ? <p className="att-feedback success">{status}</p> : null}
        {error ? <p className="att-feedback error">{error}</p> : null}

        <section className="att-section ui-section" id="tickets">
          <h2 className="ui-section-title">📅 Your Upcoming Passes</h2>
          <div className="att-grid-four ui-grid-four">
            {loading ? <p className="att-empty">Loading events...</p> : null}
            {!loading && upcomingPasses.length === 0 ? (
              <p className="att-empty">No upcoming events yet.</p>
            ) : null}
            {!loading
              ? upcomingPasses.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onRegister={handleRegister}
                    registering={registeringId === event.id}
                  />
                ))
              : null}
          </div>
        </section>

        <section className="att-section ui-section" id="discover">
          <div className="att-section-head ui-section-head">
            <h2 className="ui-section-title">Popular Events</h2>
            <button className="att-link-btn ui-link-btn" type="button" onClick={loadData}>
              Refresh
            </button>
          </div>
          <div className="att-grid-three ui-grid-three">
            {!loading && popularEvents.length === 0 ? (
              <p className="att-empty">No events yet.</p>
            ) : null}
            {!loading
              ? popularEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onRegister={handleRegister}
                    registering={registeringId === event.id}
                  />
                ))
              : null}
          </div>
        </section>

        <section className="att-section ui-section">
          <div className="att-section-head ui-section-head">
            <h2 className="ui-section-title">Recently Added</h2>
            <button className="att-link-btn ui-link-btn" type="button" onClick={loadData}>
              Refresh
            </button>
          </div>
          <div className="att-grid-three ui-grid-three">
            {!loading && recentlyAdded.length === 0 ? (
              <p className="att-empty">No recent events yet.</p>
            ) : null}
            {!loading
              ? recentlyAdded.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onRegister={handleRegister}
                    registering={registeringId === event.id}
                  />
                ))
              : null}
          </div>
        </section>

        <section className="att-section ui-section">
          <div className="att-section-head ui-section-head">
            <h2 className="ui-section-title">My Registrations</h2>
          </div>
          <div className="att-grid-three ui-grid-three">
            {myEvents.length === 0 ? (
              <p className="att-empty">No registrations yet.</p>
            ) : (
              myEvents.map((entry) => (
                <article className="att-card ui-card" key={entry.registrationId}>
                  <div className={`att-card-top ui-card-top ${entry.event.theme}`}>
                    <span className="att-chip ui-chip">{entry.event.tag}</span>
                    <span className="att-card-icon">◉</span>
                  </div>
                  <div className="att-card-body">
                    <h3>{entry.event.title}</h3>
                    <p className="att-muted">{entry.event.subtitle}</p>
                    <p className="att-meta">📅 {entry.event.date}</p>
                    <p className="att-meta">📍 {entry.event.venue}</p>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
